// import React from 'react';
// import { useNavigate, useParams  } from 'react-router-dom'; 
// // Define the data for groundnuts pests and diseases including image URLs
// const groundnutsData = {
//   name: "Groundnuts",
//   pestsDiseases: [
//     {
//       name: "Early Leaf Spot",
//       image: "early.jpg", 
//       symptoms: [
//         "May attack the crop soon after emergence.",
//         "It causes defoliation and has a potential of reducing yields by up to 50%.",
//         "It is more serious on the Plateau areas of Lilongwe-Mchinji to Kasungu Plain.",
//         "Early leaf sport lesions are roughly circular, dark brown on the upper leaf surface and a lighter shade of brown on the bottom leaf surface."
//       ],
//       control: "Use Daconil sprays at fortnight intervals."
//     },
//     {
//       name: "Late Leaf Spot",
//       image: "late.png", 
//       symptoms: [
//         "Occurs later in the season than early leaf spot.",
//         "The lesions are nearly circular rough and darker on the lower leaf surface.",
//         "It is more serious in the low altitude areas along the Lakeshore and in the Shire Valley.",
//         "Severe attacks result in heavy defoliation leading to 15 to 25% yield losses."
//       ],
//       control: "Use Daconil sprays at fortnight intervals."
//     },
//     {
//       name: "Rust",
//       image: "rust_g.jpg", // Replace with actual image URL
//       symptoms: [
//         "Orange colored pustules on the lower surface of the leaflets.",
//         "The pustules rupture to release reddish brown spores and the leaves become reddish then dry up."
//       ],
//       control: "Use Daconil sprays at fortnight intervals."
//     },
//     {
//       name: "Groundnut Rosette",
//       image: "ros.png", 
//       symptoms: [
//         "Caused by a virus whose vector is an aphid.",
//         "It can be serious in fields that are planted late and when the field is or has gaps, low plant populations.",
//         "Infected plants are chlorotic and stunted.",
//         "If the disease occurs in epidemic proportions, yield losses can approach 100 %."
//       ],
//       control: [
//          "Early planting at the recommended spacing.",
//          "Use resistant varieties such as RG1, Nsinjiro and Baka."
//       ]
//     },
//     {
//       name: "Stem Rot",
//       image: "ste.jpg", // Replace with actual image URL
//       symptoms: [
//         "It is a fungal disease and is commonly known as white mold, sclerotium rot, sclerotium blight, sclerotium wilt, root rot or foot rot.",
//         "The disease is more pronounced in the warmer climates causing stems to rot close to the ground level."
//       ],
//       control: [
//         "Use resistant varieties",
//         "Deep ploughing",
//         "Constructing raised ridges",
//         "Avoid throwing the soil to the base of the plant",
//         "Practicing crop rotation."
//       ]
//     },
//     {
//       name: "Aphids",
//       image: "aphs.jpg", 
//       symptoms: [
//         "Aphids feed on leaves and transmit viruses that cause Rosette disease."
//       ],
//       control: [
//         "Early planting at correct spacing will help to control the spreading of aphids.",
//         "Use rosette resistant varieties such as RG1, Nsinjiro and Baka in rosette endemic areas."
//       ]
//     },
//     {
//       name: "Termites",
//       image: "terms.png", 
//       symptoms: [
//         "Scarification of the pods. This weakens the shells and makes them liable to shattering or cracking during harvesting.",
//         "Penetration & hollowing of the tap root. Termites are capable of reaching upper parts of the plant inside the stems. This is common in wet period of the growing season and pass unnoticed until the plants wilt and die."
//       ],
//       control: [
//         "Use uniform cultivars to ensure even ripening and single harvesting.",
//         "There is need to have repeated mechanical cultivation to reduce termite population",
//         "For termite prone areas, aldrin or dieldrin can be used at a rate of 500g a.i. (active ingredient) per hectare. Seeds can also be dressed with aldrin at 28.5g a.i per kg of seed."
//       ]
//     },
//     {
//       name: "Cut-worms",
//       image: "cut_worms.jpg", // Replace with actual image URL
//       symptoms: [
//         "The worms cause young plants to be completely or partially severed at the ground level.",
//         "It also attack developing pods of older plants causing yield reduction."
//       ],
//       control: [
//         "Use 450g of 50% dieldrin of Wettable (Water) Powder plus 50kg of maize meal which is then wetted crumbly.",
//         "Apply this mixture per hectare as a chemical bait and should be broadcasted in the afternoon so that they are able to feed on it before it gets dry."
//       ]
//     }
//   ]
// };

// const GroundnutsPestDisease = () => {
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   // Function to handle navigation back to the previous page
//   const handleBack = () => {
//     navigate(-1); // Navigate back one step in the history stack
//   };

//   return (
//     <div className="mb-8">
//       <h2 className="text-2xl font-semibold mb-2">
//         {/* Back button */}
//         <button className="back-button" onClick={handleBack}>
//           {/* Back symbol (arrow icon) */}
//           {/* &#8592; */}
//         </button>
//         {groundnutsData.name}
//       </h2>
//       {groundnutsData.pestsDiseases.map((item) => (
//         <div key={item.name} className="mb-4 p-4 border rounded-lg flex">
//           {item.image && (
//             <img src={item.image} alt={item.name} className="h-32 w-32 object-cover mr-4 rounded-lg" />
//           )}
//           <div>
//             <h3 className="text-xl font-bold">{item.name}</h3>
//             <div className="ml-4">
//               {item.symptoms && (
//                 <>
//                   <h4 className="font-semibold">Symptoms:</h4>
//                   <ul className="list-disc list-inside">
//                     {item.symptoms.map((symptom, index) => (
//                       <li key={index}>{symptom}</li>
//                     ))}
//                   </ul>
//                 </>
//               )}
//               {item.control && (
//                 <>
//                   <h4 className="font-semibold mt-2">Control:</h4>
//                   {Array.isArray(item.control) ? (
//                     <ul className="list-disc list-inside">
//                       {item.control.map((controlItem, index) => (
//                         <li key={index}>{controlItem}</li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p>{item.control}</p>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default GroundnutsPestDisease;
