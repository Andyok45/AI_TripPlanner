import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelLists } from '@/constants/options';
import generateBudgetOptions from '@/service/AIModal';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import ReactDOM from 'react-dom';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialogue, setOpenDialogue] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    if (name === 'noOfDays' && (value < 1 || value > 30)) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log('Login successful:', codeResp);
      getUserProfile(codeResp);
    },
    onError: (error) => {
      console.log('Login Failed:', error);
      toast.error('Google login failed. Please try again.');
      setLoading(false);
    },
  });

  const onGenerateBudgetOptions = async () => {
    if (!formData?.From || !formData?.Location || !formData?.noOfDays || !formData?.TravelList) {
      toast.error("Please fill all the fields");
      return;
    }

    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialogue(true);
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{fromLocation}', formData?.From?.label)
      .replace('{location}', formData?.Location?.label)
      .replace('{noOfDays}', formData?.noOfDays)
      .replace('{people}', formData?.TravelList)
      .replace('{fromLocation}', formData?.From?.label);

    console.log('Sending AI prompt:', FINAL_PROMPT);

    try {
      const data = await generateBudgetOptions(FINAL_PROMPT);
      console.log('AI response:', data);
      SaveAiTrip(data);
    } catch (error) {
      console.error('Error generating budget options:', error);
      toast.error('Failed to generate budget options');
      setLoading(false);
    }
  }

  const SaveAiTrip = async (TripData) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const docId = Date.now().toString();
      await setDoc(doc(db, 'AITrips', docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId
      });
      toast.success('Trip created successfully!');
      // Redirect or navigate to next page if needed

      navigate('/view-trip/' + docId);
    } catch (error) {
      console.error('Error saving trip:', error);
      toast.error('Failed to save trip data');
    } finally {
      setLoading(false);
    }
  }

  const getUserProfile = (tokenInfo) => {
    setLoading(true);
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    })
      .then((res) => {
        console.log('User profile:', res.data);
        localStorage.setItem('user', JSON.stringify(res?.data));
        setOpenDialogue(false);
        // Wait for state update to complete before proceeding
        setTimeout(() => {
          onGenerateBudgetOptions();
        }, 100);
      })
      .catch((error) => {
        console.error('Error getting user profile:', error);
        toast.error('Failed to get user profile');
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className={`sm:px-6 md:px-10 lg:px-16 xl:px-20 mt-6 transition-opacity duration-300 ${openDialogue ? "opacity-20 pointer-events-none" : "opacity-100"}`}>
          <h2 className="font-bold text-3xl text-gray-800"># Tell us your travel preferences</h2>
          <p className="mt-3 text-gray-600 text-xl">Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

          <div className="mt-16 flex flex-col gap-12">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl mb-4 font-medium text-gray-700">From where are you travelling?</h2>
              <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                  place,
                  onChange: (v) => {
                    setPlace(v);
                    handleInputChange('From', v);
                  },
                  placeholder: "Enter your starting location",
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      borderRadius: '0.5rem',
                      padding: '0.25rem',
                      borderColor: '#e2e8f0',
                      boxShadow: 'none',
                      '&:hover': {
                        borderColor: '#cbd5e1',
                      },
                    }),
                  },
                }}
              />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl mb-4 font-medium text-gray-700">What is destination of choice?</h2>
              <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                  place,
                  onChange: (v) => {
                    setPlace(v);
                    handleInputChange('Location', v);
                  },
                  placeholder: "Where do you want to go?",
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      borderRadius: '0.5rem',
                      padding: '0.25rem',
                      borderColor: '#e2e8f0',
                      boxShadow: 'none',
                      '&:hover': {
                        borderColor: '#cbd5e1',
                      },
                    }),
                  },
                }}
              />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl mb-4 font-medium text-gray-700">How many days are you planning the trip for?</h2>
              <Input
                placeholder="Ex. 3"
                type="number"
                min="1"
                max="30"
                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => handleInputChange('noOfDays', e.target.value)}
              />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl mb-4 font-medium text-gray-700">Who do you plan on travelling with for this adventure?</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                {SelectTravelLists.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleInputChange('TravelList', item.people)}
                    className={`p-5 border rounded-xl transition-all duration-200 hover:shadow-md cursor-pointer
                      ${formData?.TravelList === item.people ? 'border-[#f56551] shadow-lg bg-[#fff8f7]' : 'border-gray-200 hover:border-gray-300'}
                    `}
                  >
                    <h2 className="text-4xl mb-2">{item.icon}</h2>
                    <h2 className="font-bold pt-3 text-gray-800">{item.title}</h2>
                    <h2 className="text-sm text-gray-500 mt-1">{item.people}</h2>
                    <h2 className="text-sm text-gray-500 mt-2">{item.description}</h2>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="my-12 flex justify-center">
            <Button
              disabled={loading}
              onClick={onGenerateBudgetOptions}
              className="px-8 py-6 text-lg rounded-xl bg-gradient-to-r from-[#f56551] to-[#fd7668] hover:from-[#f4533e] hover:to-[#fd6555] flex items-center gap-3 transition-all shadow-md hover:shadow-lg"
            >
              {loading ? (
                <>
                  <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                'Generate Budget Options'
              )}
            </Button>
          </div>
        </div>

        {openDialogue && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              padding: '32px',
              width: '100%',
              maxWidth: '420px',
              position: 'relative',
              zIndex: 10000
            }}
          >
            {/* Close button */}
            {!loading && (
              <button
                onClick={() => setOpenDialogue(false)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  color: '#6b7280',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  padding: '4px'
                }}
                aria-label="Close dialog"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            {/* Dialog header */}
            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937' }}>Sign in with Google</h2>
              <p style={{ color: '#6b7280', marginTop: '8px' }}>Please sign in to continue with your trip planning</p>
            </div>

            {/* Dialog content */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src="/logo.svg" alt="Logo" style={{ width: '80px', height: '80px' }} />
              <p style={{ fontWeight: '700', fontSize: '18px', marginTop: '28px', textAlign: 'center', color: '#374151' }}>
                Sign in to the App with Google authentication securely
              </p>

              <button
                onClick={login}
                disabled={loading}
                style={{
                  width: '100%',
                  marginTop: '32px',
                  backgroundColor: loading ? '#93c5fd' : '#2563eb',
                  color: 'white',
                  fontWeight: '500',
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: loading ? 'default' : 'pointer',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}
              >
                {loading ? (
                  <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="32" strokeDashoffset="8" />
                  </svg>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                      <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
                      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                    </svg>
                    Sign in with Google
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default CreateTrip;








































// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { AI_PROMPT, SelectBudgetOptions, SelectTravelLists } from '@/constants/options';
// import generateBudgetOptions from '@/service/AIModal';
// import React, { useEffect, useState } from 'react'
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
// import { Link } from 'react-router-dom';
// import { toast } from 'sonner';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { useGoogleLogin } from '@react-oauth/google';
// import { doc, setDoc } from 'firebase/firestore';
// import { db } from '@/service/firebaseConfig';
// import { AiOutlineLoading3Quarters } from 'react-icons/ai';


// function CreateTrip() {

//   const [place, setPlace] = useState();

//   const [formData, setFormData] = useState([]);

//   const [openDialogue, setOpenDialogue] = useState(false);

//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (name, value) => {

//     if(name === 'noOfDays' && (value < 1 || value > 30)){
//       return;
//     }

//     setFormData({
//       ...formData,
//       [name]: value
//     })
//   }

//   useEffect(() => {
//     console.log(formData);
//   }, [formData])

//   const login = useGoogleLogin({
//     onSuccess: (codeResp) => {
//       console.log(codeResp);
//       getUserProfile(codeResp); // Pass the response to getUserProfile
//     },
//     onError: (error) => {
//       console.log('Login Failed:', error);
//       toast.error("Google login failed");
//     },
//   });

//   const onGenerateBudgetOptions = async() => {
//     if(formData?.From == undefined ||formData?.Location === undefined || formData?.noOfDays === undefined || formData?.TravelList === undefined){
//       toast("Please fill all the fields");
//       return;
//     }

//     const user = localStorage.getItem('user');

//     if(!user) {
//       setOpenDialogue(true);
//       return;
//     }

//     setLoading(true);

//     const FINAL_PROMPT = AI_PROMPT
//     .replace('{fromLocation}', formData?.From?.label)
//     .replace('{location}', formData?.Location?.label)
//     .replace('{noOfDays}', formData?.noOfDays)
//     .replace('{people}', formData?.TravelList)
//     .replace('{fromLocation}', formData?.From?.label);

//     console.log(FINAL_PROMPT);

//     const data = await generateBudgetOptions(FINAL_PROMPT);

//     setLoading(false);
//     SaveAiTrip(data?.response?.text());

//   }

//   const SaveAiTrip = async(TripData) => {
//     setLoading(true);
//     const user = JSON.parse(localStorage.getItem('user')) ;
//     const docId = Date.now().toString();
//       await setDoc(doc(db, 'AITrips', docId), {
//         userSelection: formData,
//         tripData: JSON.parse(TripData),
//         userEmail: user?.email,
//         id: docId
//       })

//     setLoading(false);
//   }

//   const getUserProfile = (tokenInfo) => {
//     setLoading(true);
//     axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
//       headers: {
//         Authorization: `Bearer ${tokenInfo?.access_token}`,
//         Accept: 'Application/json'
//       }
//     }).then((res) => {
//       console.log(res);
//       localStorage.setItem('user', JSON.stringify(res?.data));
//       setLoading(false);
//       setOpenDialogue(false); // Close the dialog after successful login
//       onGenerateBudgetOptions(); // Continue with the budget generation
//     }).catch(error => {
//       console.error("Error fetching user profile:", error);
//       setLoading(false);
//       toast.error("Failed to get user profile");
//     });
//   }

//   return (
//     <div>
//     <div className={`sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 ${openDialogue? "hidden" : "block"}`}>
//         <h2 className='font-bold text-3xl'># Tell us your travel preferences</h2>
//         <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferneces.</p>

//         <div className='mt-20 flex flex-col gap-10'>

//         <div>
//             <h2 className='text-xl my-3 font-medium'>From where are you travelling?</h2>
//             <GooglePlacesAutocomplete
//               apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
//               selectProps={{
//                 place,
//                 onChange: (v) => {
//                 setPlace(v);
//                 handleInputChange('From', v);
//               },
//               }}
//             />
//           </div>

//           <div>
//             <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
//             <GooglePlacesAutocomplete
//               apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
//               selectProps={{
//                 place,
//                 onChange: (v) => {
//                 setPlace(v);
//                 handleInputChange('Location', v);
//               },
//               }}
//             />
//           </div>

//           <div>
//             <h2 className='text-xl my-3 font-medium'>How many days are you planning the trip for?</h2>
//             <Input placeholder={'Ex. 3'} type='number'
//               onChange={(e) => handleInputChange('noOfDays', e.target.value)}
//             />
//           </div>

//           <div>
//             <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with for this adventure?</h2>

//             <div className='grid grid-cols-4 mt-5'>
//               {SelectTravelLists.map((item, index) => (
//                 <div key={index}
//                   onClick={() => handleInputChange('TravelList', item.people)}
//                 className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
//                   ${formData?.TravelList == item.people ? 'border-[#f56551] shadow-lg' : 'border-gray-300'}
//                   `}>
//                   <h2 className='text-4xl'>{item.icon}</h2>
//                   <h2 className='font-bold pt-4'>{item.title}</h2>
//                   <h2 className='text-sm text-gray-500'>{item.people}</h2>
//                   <h2 className='text-sm text-gray-500'>{item.description}</h2>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>


//         <div>

//               <Button disable={loading} onClick={onGenerateBudgetOptions} className='my-10  flex'>{loading? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/> : 'Generate Budget Options'}</Button>

//         </div>


//     </div>

//      {/* <!-- Dialog overlay - shown when openDialogue is true --> */}
// <div className={`fixed inset-0 ${openDialogue ? 'block' : 'hidden'}`}>
//   {/* Backdrop with blur effect */}
//   <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//     {/* <!-- Dialog container --> */}
//     <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6 relative animate-fadeIn">
//       {/* Close button */}
//       <button
//         onClick={() => setOpenDialogue(false)}
//         className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
//         aria-label="Close dialog"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//         </svg>
//       </button>

//       {/* <!-- Dialog header --> */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold text-gray-800">Sign in with Google to continue</h2>
//       </div>

//       {/* <!-- Dialog content --> */}
//       <div className="flex flex-col items-center">
//         <img src="/logo.svg" alt="Logo" className="w-16 h-16" />
//         <p className="font-bold text-lg mt-7 text-center">Sign in to the App with Google authentication securely</p>
//         <button
//           onClick={() => {
//             login();
//             // The actual closing will happen in getUserProfile after successful login
//           }}
//           className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
//             <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
//             <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
//             <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
//             <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
//           </svg>
//           Sign in with Google
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
// </div>
//   )
// }

// export default CreateTrip