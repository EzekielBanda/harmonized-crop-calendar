// import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate hook from react-router-dom

// const maizeData = {
//   name: "Maize",
//   pestsDiseases: [
//     // Pests
//     {
//       name: "Stalk-borer or stem-borer",
//       type: "pest",
//       symptoms: [
//         "Feeds on the growing points and then the cob."
//       ],
//       control: [
//         "Early planting",
//         "Remove and destroy all the infected growing plants."
//       ],
//       image: "maize_1.jpg"
//     },
//     {
//       name: "Army worm",
//       type: "pest",
//       symptoms: [
//         "Feeds on maize leaves and they attack in large numbers (army worm) and very serious under dry condition."
//       ],
//       control: "Control is by spraying carbarlyl 85%wp (sevin) dissolved in 14 litres of water and providing training to farmers.",
//       image: "army.jpg"
//     },
//     {
//       name: "Maize Weevil",
//       type: "pest",
//       symptoms: [
//         "This is a post-harvest insect which eats stored maize grain. It is more destructive on dent maize."
//       ],
//       control: "Control is done by dusting Actellic dust or other recommended chemicals by extension officers.",
//       image: "weev.jpg"
//     },
//     {
//       name: "Termites",
//       type: "pest",
//       symptoms: [
//         "They attack maize stalks causing lodging. Fallen cobs are also attacked in the process."
//       ],
//       control: "To reduce the damage, banking should be done when the plants are still young.",
//       image: "termites.jpg"
//     },
//     {
//       name: "Rodents",
//       type: "pest",
//       symptoms: [
//         "These are very common in storage. They feed on the maize grain from the storage."
//       ],
//       control: [],
//       image: "rods.jpg"
//     },
//     // Diseases
//     {
//       name: "Leaf Blight",
//       type: "disease",
//       symptoms: [
//         "Caused by a fungus. It is seldom seen before tasselling.",
//         "There are boat-shaped, greyish lesions on the infected spots.",
//         "The lower leaves are infected first and those heavily infected may die.",
//         "The younger the plant, the greater the reduction in yield."
//       ],
//       control: "Use of improved certified seed. At a larger scale spray of some fungicides might be necessary.",
//       image: "leaf.jpg"
//     },
//     {
//       name: "Rust",
//       type: "disease",
//       symptoms: [
//         "Maize is susceptible to several rust diseases but the most common one is called Pucciniasorghi.",
//         "Greyish lump but turns black and releases the spore as they mature.",
//         "They attack every part of the plant."
//       ],
//       control: [],
//       image: "rust.jpg"
//     },
//     {
//       name: "Smut",
//       type: "disease",
//       symptoms: [
//         "Common smut caused by fungus.",
//         "Symptoms are stunting, distorted leaves, excessive branching, yellowing of vines and dark, brown to blackish corky spots in the roots."
//       ],
//       control: [
//         "Use disease free planting materials coupled with field sanitation.",
//         "Control virus vectors, aphids and white flies.",
//         "Use resistant varieties."
//       ],
//       image: "smut.jpg"
//     }
//   ]
// };

// const MaizePestDisease = ({ type }) => {
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   // Function to handle navigation back to the previous page
//   const handleBack = () => {
//     navigate(-1); // Navigate back one step in the history stack
//   };

//   const pests = maizeData.pestsDiseases.filter(item => item.type === "pest");
//   const diseases = maizeData.pestsDiseases.filter(item => item.type === "disease");

//   const itemsToShow = type === 'pest' ? pests : diseases;

//   return (
//     <div className="mb-8">
//       <h2 className="text-2xl font-semibold mb-2">
//         {/* Back button */}
//         <button className="back-button" onClick={handleBack}>
//           {/* Back symbol (arrow icon) */}
//           {/* &#8592; */}
//         </button>
//         {maizeData.name}
//       </h2>
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <h3 className="text-xl font-semibold mb-2">{type === 'pest' ? 'Pests' : 'Diseases'}</h3>
//           {itemsToShow.map((item) => (
//             <div key={item.name} className="mb-4 p-4 border rounded-lg flex items-center">
//               {item.image && (
//                 <img src={item.image} alt={item.name} className="h-32 w-32 object-cover mr-4 rounded-lg" />
//               )}
//               <div>
//                 <h4 className="text-lg font-bold">{item.name}</h4>
//                 <div className="ml-4">
//                   <h5 className="font-semibold">Symptoms:</h5>
//                   <ul className="list-disc list-inside">
//                     {item.symptoms.map((symptom, index) => (
//                       <li key={index}>{symptom}</li>
//                     ))}
//                   </ul>
//                   {item.control.length > 0 && (
//                     <>
//                       <h5 className="font-semibold">Control:</h5>
//                       <ul className="list-disc list-inside">
//                         {Array.isArray(item.control) ? (
//                           item.control.map((control, index) => (
//                             <li key={index}>{control}</li>
//                           ))
//                         ) : (
//                           <li>{item.control}</li>
//                         )}
//                       </ul>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MaizePestDisease;
