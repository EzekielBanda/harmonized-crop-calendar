import React, { useState} from "react";
import { useNavigate, useParams } from 'react-router-dom';

const cropData = {
  groundnuts: {
    name: "Groundnuts",
    pestsDiseases: [
      //Diseases
      {
        name: "Early Leaf Spot",
        type: "disease",
        image: "/early.jpg", 
        symptoms: [
          "May attack the crop soon after emergence.",
          "It causes defoliation and has a potential of reducing yields by up to 50%.",
          "It is more serious on the Plateau areas of Lilongwe-Mchinji to Kasungu Plain.",
          "Early leaf sport lesions are roughly circular, dark brown on the upper leaf surface and a lighter shade of brown on the bottom leaf surface."
        ],
        control: "Use Daconil sprays at fortnight intervals."
      },
      {
        name: "Late Leaf Spot",
        type: "disease",
        image: "/late.png", 
        symptoms: [
          "Occurs later in the season than early leaf spot.",
          "The lesions are nearly circular rough and darker on the lower leaf surface.",
          "It is more serious in the low altitude areas along the Lakeshore and in the Shire Valley.",
          "Severe attacks result in heavy defoliation leading to 15 to 25% yield losses."
        ],
        control: "Use Daconil sprays at fortnight intervals."
      },
      {
        name: "Rust",
        type: "disease",
        image: "/rust_g.jpg",
        symptoms: [
          "Orange colored pustules on the lower surface of the leaflets.",
          "The pustules rupture to release reddish brown spores and the leaves become reddish then dry up."
        ],
        control: "Use Daconil sprays at fortnight intervals."
      },
      {
        name: "Groundnut Rosette",
        type: "disease",
        image: "/ros.png",
        symptoms: [
          "Caused by a virus whose vector is an aphid.",
          "It can be serious in fields that are planted late and when the field is or has gaps, low plant populations.",
          "Infected plants are chlorotic and stunted.",
          "If the disease occurs in epidemic proportions, yield losses can approach 100 %."
        ],
        control: [
           "Early planting at the recommended spacing.",
           "Use resistant varieties such as RG1, Nsinjiro and Baka."
        ]
      },
      {
        name: "Stem Rot",
        type: "disease",
        image: "/ste.jpg",
        symptoms: [
          "It is a fungal disease and is commonly known as white mold, sclerotium rot, sclerotium blight, sclerotium wilt, root rot or foot rot.",
          "The disease is more pronounced in the warmer climates causing stems to rot close to the ground level."
        ],
        control: [
          "Use resistant varieties",
          "Deep ploughing",
          "Constructing raised ridges",
          "Avoid throwing the soil to the base of the plant",
          "Practicing crop rotation."
        ]
      },
      //Pests
      {
        name: "Aphids",
        type: "pest",
        image: "/aphs.jpg",
        symptoms: [
          "Aphids feed on leaves and transmit viruses that cause Rosette disease."
        ],
        control: [
          "Early planting at correct spacing will help to control the spreading of aphids.",
          "Use rosette resistant varieties such as RG1, Nsinjiro and Baka in rosette endemic areas."
        ]
      },
      {
        name: "Termites",
        type: "pest",
        image: "/terms.png",
        symptoms: [
          "Scarification of the pods. This weakens the shells and makes them liable to shattering or cracking during harvesting.",
          "Penetration & hollowing of the tap root. Termites are capable of reaching upper parts of the plant inside the stems. This is common in wet period of the growing season and pass unnoticed until the plants wilt and die."
        ],
        control: [
          "Use uniform cultivars to ensure even ripening and single harvesting.",
          "There is need to have repeated mechanical cultivation to reduce termite population",
          "For termite prone areas, aldrin or dieldrin can be used at a rate of 500g a.i. (active ingredient) per hectare. Seeds can also be dressed with aldrin at 28.5g a.i per kg of seed."
        ]
      },
      {
        name: "Cut-worms",
        type: "pest",
        image: "/cut_worms.jpg",
        symptoms: [
          "The worms cause young plants to be completely or partially severed at the ground level.",
          "It also attack developing pods of older plants causing yield reduction."
        ],
        control: [
          "Use 450g of 50% dieldrin of Wettable (Water) Powder plus 50kg of maize meal which is then wetted crumbly.",
          "Apply this mixture per hectare as a chemical bait and should be broadcasted in the afternoon so that they are able to feed on it before it gets dry."
        ]
      }
    ]
  },
  maize: {
    name: "Maize",
    pestsDiseases: [
      //pests
      {
        name: "Stalk-borer or stem-borer",
        type: "pest",
        symptoms: [
          "Feeds on the growing points and then the cob."
        ],
        control: [
          "Early planting",
          "Remove and destroy all the infected growing plants."
        ],
        image: "/maize_1.jpg"
      },
      {
        name: "Army worm",
        type: "pest",
        symptoms: [
          "Feeds on maize leaves and they attack in large numbers (army worm) and very serious under dry condition."
        ],
        control: "Control is by spraying carbarlyl 85%wp (sevin) dissolved in 14 litres of water and providing training to farmers.",
        image: "/army.jpg"
      },
      {
        name: "Maize Weevil",
        type: "pest",
        symptoms: [
          "This is a post-harvest insect which eats stored maize grain. It is more destructive on dent maize."
        ],
        control: "Control is done by dusting Actellic dust or other recommended chemicals by extension officers.",
        image: "/weev.jpg"
      },
      {
        name: "Termites",
        type: "pest",
        symptoms: [
          "They attack maize stalks causing lodging. Fallen cobs are also attacked in the process."
        ],
        control: "To reduce the damage, banking should be done when the plants are still young.",
        image: "/termites.jpg"
      },
      {
        name: "Rodents",
        type: "pest",
        symptoms: [
          "These are very common in storage. They feed on the maize grain from the storage."
        ],
        control: [],
        image: "/rods.jpg"
      },
      //diseases
      {
        name: "Leaf Blight",
        type: "disease",
        symptoms: [
          "Caused by a fungus. It is seldom seen before tasselling.",
          "There are boat-shaped, greyish lesions on the infected spots.",
          "The lower leaves are infected first and those heavily infected may die.",
          "The younger the plant, the greater the reduction in yield."
        ],
        control: "Use of improved certified seed. At a larger scale spray of some fungicides might be necessary.",
        image: "/leaf.jpg"
      },
      {
        name: "Rust",
        type: "disease",
        symptoms: [
          "Maize is susceptible to several rust diseases but the most common one is called Pucciniasorghi.",
          "Greyish lump but turns black and releases the spore as they mature.",
          "They attack every part of the plant."
        ],
        control: [],
        image: "/rust.jpg"
      },
      {
        name: "Smut",
        type: "disease",
        symptoms: [
          "Common smut caused by fungus.",
          "Symptoms are stunting, distorted leaves, excessive branching, yellowing of vines and dark, brown to blackish corky spots in the roots."
        ],
        control: [
          "Use disease free planting materials coupled with field sanitation.",
          "Control virus vectors, aphids and white flies.",
          "Use resistant varieties."
        ],
        image: "/smut.jpg"
      }
    ]
  },
  rice: {
    name: "Rice",
    pestsDiseases: [
      //pests
      {
        name: "Rice insect pests",
        type: "pest",
        symptoms: [
          "Common insects are grasshoppers (bwanoni), short fly and army worm, rice keeper, mole cricket, ant and armyworm."
        ],
        control: "Control by early sowing, maintaining, weed-free, applying carbarbly, cypermetrine, and fenitrothhion.",
        image: "/rice_4.jpg"
      },
      //diseases
      {
        name: "Sheath Blight",
        type: "disease",
        symptoms: [
          "Symptoms are observed from tillering to milk stage.",
          "In intensified rice production systems it causes a yield loss of 6%."
        ],
        control: "Plant resistant varieties, avoid planting infected seed and applying mancozeb and carbendazim.",
        image: "/rice_5.jpg"
      },
      {
        name: "Bacterial blight",
        type: "disease",
        symptoms: [
          "Affects rice at seedling stage.",
          "Symptoms: infected leaves turn grayish green and roll up.",
          "In adverse conditions leaves turn yellow to straw-colored and wilt leading whole seedlings to dry up and die."
        ],
        control: "The disease is treated by nitrogen fertilizers.",
        image: "/rice_7.jpg"
      },
      {
        name: "Rice blast",
        type: "disease",
        symptoms: [
          "It is caused by fungus.",
          "The disease is common in Nkhata Bay.",
          "Symptoms; it produces so may pathogenic races which tend to differ in terms of varieties."
        ],
        control: "It can best be controlled by planting resistant varieties.",
        image: "/rice_8.jpg"
      },
      {
        name: "Sheath rot",
        type: "disease",
        symptoms: [
          "It is caused by virus and identified.",
          "Symptoms it is observed by rotted growing panicle being incompletely exerted with numerous empty grains."
        ],
        control: [
          "The disease can be managed by planting resistant varieties.",
          "To eradicate seed-borne pathogens use mancozeb an benomyl for seed treatment."
        ],
        image: "/rice_9.jpg"
      },
      {
        name: "Yellow Mottle Virus (RYMV)",
        type: "disease",
        symptoms: [
          "It is caused by a virus.",
          "Symptoms: stunted plants, and reduced tillering, mottling, yellowish streaking of leaves, malformation and panicle partial emergency.",
          "Severe infected by plats die."
        ],
        control: "Planting Resistant varieties.",
        image: "/rice_10.jpg"
      }
    ]
  },
  soyabeans: {
    name: "SoyaBeans",
    pestsDiseases: [
      //pests
      {
        name: "Caterpillars",
        type: "pest",
        image: "/soy_2.png",
        symptoms: [
          "Soybean lopper, leaf miners, leaf rollers.",
          "These insect pests feed on the foliage.",
          "They reduce the plant photosynthetic area thereby affecting final yield."
        ],
        control: "Once insecticide application is usually enough to control insect attacks. Can also be controlled by applying Tephrosia Vogelii (Fish bean) seeds and leaves which are a good local insecticide."
      },
      {
        name: "Termite",
        type: "pest",
        image: "/soy_3.jpg",
        symptoms: [
          "Can attack soybean plants at any stage of development from seed to mature soybean plant particularly when there is prolonged dry spell.",
          "First sign of termite attack is wilting leading to death or falling over of plants.",
          "Pull out affected plants to examine roots and lower stem for live termites and/or tunneling.",
          "Plant roots and stems may be completely hollowed out and soil-filled.",
          "Damage by termites is greater in rain-fed than irrigated crop, dry periods than periods of regular rainfall, lowland rather than highland areas, and in plants under stress rather than in healthy and vigorous plants.",
          "Plants can be under stress from weeds competing with crops for nutrients, light and water, hence increasing susceptibility to termite attack."
        ],
        control: "Crop rotation and removal of other debris from the field reduces build-up of termites, reduces potential termite food supplies, thus reducing termite number and subsequent attack."
      },
      //diseases
      {
        name: "Soybean Rust",
        type: "disease",
        image: "/soy_4.png",
        symptoms: [
          "The only disease of economic importance.",
          "Other diseases such as frogeye, bacterial pastule, red lead blotch occur but are less important economically.",
          "Asian soybean rust, caused by Phakapsora pachyrhizi, is one of the notable foliar soybean diseases in Malawi.",
          "Infected leaves have small tan to dark brown or reddish-brown lesions on which small raised pustules (or bumps) occur on the lower surface of the leaves.",
          "Pustules produce a large number of spores.",
          "Brown or rust-colored powder falls when severely infected leaves are tapped over a white paper or cloth.",
          "Severe infection leads to premature defoliation and yield losses up to 80%.",
          "Soybean rust is of great economic importance where humidity and rainfall are high.",
          "Late planted soybean is prone to soybean rust infection."
        ]
      },
      {
        name: "Soybean cyst nematode (SCN), Heterodera glycines",
        type: "disease",
        image: "/soy_6.jpg",
        symptoms: [
          "It can be present in the field without causing obvious above-ground symptoms.",
          "In heavily infested fields, SCN can cause yield losses of more than 30%.",
          "Infested plants become stunted, canopy closure does not occur, leaves become chlorotic; however, these symptoms may also be caused by other crop stresses such as nutrient deficiencies.",
          "Severely infected plants may die before flowering, especially during dry periods where soils have poor water holding capacity."
        ],
        control: [
          "Ensure good soil fertility and adequate moisture increase tolerance and reduce the severity of above-ground symptoms in fields.",
          "Employ good crop production practices to reduce severity of nematode infestation; for instance, a 1 to 2-year rotation with Maize or cotton (non-hosts) has proven effective for many soybean growers.",
          "Use resistant varieties such as Ocepara 4."
        ]
      },
      {
        name: "Pod-sucking buds",
        type: "disease",
        image: "/soy_8.jpg",
        symptoms: [
          "Attack crop from flowering onwards."
        ],
        control: "Insect pests can be controlled with a single spray of Cypermethrin + Dimethoate 10 EC. Read the chemical label for instructions."
      },
      {
        name: "Virus diseases",
        type: "disease",
        image: "/soy_9.jpg",
        symptoms: [
          "Commonly transmitted by insects such as whitefly.",
          "Symptoms range from mosaic and mottling, leaf curling, green vein banding, and stunting.",
          "Foliar symptoms of virus infection include mosaic and mottling, thickening or brittling of older leaves, puckering, leaf distortion, severe reduction in leaf size, and stunting of plants."
        ],
        control: "Remove and burn infected plants."
      },
      {
        name: "General Control of Soybean diseases",
        type: "disease",
        image: "/soy_7.png",
        control: [
          "Use certified seed to avoid seed-borne infection.",
          "Use varieties resistant to prevailing diseases of the area.",
          "Plant early to escape diseases that come late in the season and to encourage good establishment of soybean plant to withstand disease attack.",
          "Avoid planting seeds obtained from mosaic affected plants.",
          "Uproot and destroy symptomatic plants.",
          "Do not use seed that is cracked or broken; take care during harvesting and handling to reduce mechanical damage.",
          "Rotate soybeans with non-host crops such as Maize or sorghum.",
          "Eradicate weeds and voluntary plants in the vicinity of soybeans sites as these act as host agents."
        ]
      }
    ]
  }
};


const PestDiseasePage = () => {
  const navigate = useNavigate();
  const { crop } = useParams();
  const cropInfo = cropData[crop.toLowerCase()];

  const [showPests, setShowPests] = useState(false);
  const [showAll, setShowAll] = useState(false);

  if (!cropInfo) {
    return <div>Invalid crop selected.</div>;
  }

  const handleBack = () => {
    navigate(-1); // Navigate back one step in the history stack
  };

  const togglePestsDiseases = () => {
    setShowPests(!showPests);
  };

  
  const handleReadMore = () => {
    setShowAll(true);
  };

  const itemsToShow = cropInfo.pestsDiseases.filter(item => showPests ? item.type === 'pest' : item.type === 'disease');
  const items = showAll ? itemsToShow : itemsToShow.slice(0, 2);


  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">
        <button className="back-button" onClick={handleBack}>
            ←
        </button>
        {cropInfo.name}
      </h2>
      <div className="mb-4">
        <button
          className={`toggle-button ${!showPests ? 'active' : ''}`}
          onClick={() => setShowPests(false)}
        >
          Diseases
        </button>
        <button
          className={`toggle-button ${showPests ? 'active' : ''}`}
          onClick={() => setShowPests(true)}
        >
          Pests
        </button>
      </div>
      {cropInfo.pestsDiseases.filter(item => showPests ? item.type === 'pest' : item.type === 'disease').map((item) => (
        <div key={item.name} className="mb-4 p-4 border rounded-lg flex">
          {item.image && (
            <img src={item.image} alt={item.name} className="h-32 w-32 object-cover mr-4 rounded-lg" />
          )}
          <div>
            <h3 className="text-xl font-bold">{item.name}</h3>
            <div className="ml-4">
              {item.symptoms && (
                <>
                  <h4 className="font-semibold">Symptoms:</h4>
                  <ul className="list-disc list-inside">
                    {item.symptoms.map((symptom, index) => (
                      <li key={index}>{symptom}</li>
                    ))}
                  </ul>
                </>
              )}
              {item.control && (
                <>
                  <h4 className="font-semibold mt-2">Control:</h4>
                  {Array.isArray(item.control) ? (
                    <ul className="list-disc list-inside">
                      {item.control.map((controlItem, index) => (
                        <li key={index}>{controlItem}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{item.control}</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PestDiseasePage;