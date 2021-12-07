const fetchGetIngredientsList = {
  meals: [
    {
      idIngredient: '1',
      strIngredient: 'Chicken',
      strDescription:
      `The chicken is a type of domesticated fowl, a subspecies of the red junglefowl
         (Gallus gallus). It is one of the most common and widespread domestic animals,
         with a total population of more than 19 billion as of 2011. There are more
         chickens in the world than any other bird or domesticated fowl. Humans keep
         chickens primarily as a source of food (consuming both their meat and eggs)
         and, less commonly, as pets. Originally raised for cockfighting or for special
         ceremonies, chickens were not kept for food until the Hellenistic period
         (4th–2nd centuries BC). Genetic studies have pointed to multiple maternal
         origins in South Asia, Southeast Asia, and East Asia, but with the clade found
         in the Americas, Europe, the Middle East and Africa originating in the Indian
         subcontinent. From ancient India, the domesticated chicken spread to Lydia in
         western Asia Minor, and to Greece by the 5th century BC. Fowl had been known 
         in Egypt since the mid-15th century BC, with the 'bird that gives birth every 
         day' having come to Egypt from the land between Syria and Shinar, Babylonia, 
         according to the annals of Thutmose III.`,
      strType: null,
    },
    {
      idIngredient: '2',
      strIngredient: 'Salmon',
      strDescription:
      `Salmon is the common name for several species of ray-finned fish in the family 
        Salmonidae. Other fish in the same family include trout, char, grayling and 
        whitefish. Salmon are native to tributaries of the North Atlantic (genus Salmo) 
        and Pacific Ocean (genus Oncorhynchus). Many species of salmon have been 
        introduced into non-native environments such as the Great Lakes of North America 
        and Patagonia in South America. Salmon are intensively farmed in many parts of 
        the world. Typically, salmon are anadromous: they hatch in fresh water, migrate 
        to the ocean, then return to fresh water to reproduce. However, populations of 
        several species are restricted to fresh water through their lives. Folklore has 
        it that the fish return to the exact spot where they hatched to spawn. Tracking 
        studies have shown this to be mostly true. A portion of a returning salmon run 
        may stray and spawn in different freshwater systems; the percent of straying 
        depends on the species of salmon. Homing behavior has been shown to depend on 
        olfactory memory. Salmon date back to the Neogene.`,
      strType: null,
    },
    {
      idIngredient: '3',
      strIngredient: 'Beef',
      strDescription:
        `Beef is the culinary name for meat from cattle, particularly skeletal muscle. 
        Humans have been eating beef since prehistoric times. Beef is a source of 
        high-quality protein and nutrients. Most beef skeletal muscle meat can be 
        used as is by merely cutting into certain parts, such as roasts, short ribs 
        or steak (filet mignon, sirloin steak, rump steak, rib steak, rib eye steak, 
        hanger steak, etc.), while other cuts are processed (corned beef or beef 
        jerky). Trimmings, on the other hand, are usually mixed with meat from 
        older, leaner (therefore tougher) cattle, are ground, minced or used in 
        sausages. The blood is used in some varieties called blood sausage. 
        Other parts that are eaten include other muscles and offal, such as the 
        oxtail, liver, tongue, tripe from the reticulum or rumen, glands 
        (particularly the pancreas and thymus, referred to as sweetbread), the heart,
        the brain (although forbidden where there is a danger of bovine spongiform 
        encephalopathy, BSE, commonly referred to as mad cow disease), the kidneys, 
        and the tender testicles of the bull (known in the United States as calf 
        fries, prairie oysters, or Rocky Mountain oysters). Some intestines are 
        cooked and eaten as is, but are more often cleaned and used as natural 
        sausage casings. The bones are used for making beef stock.`,
      strType: null,
    },
    {
      idIngredient: '4',
      strIngredient: 'Pork',
      strDescription:
        `Pork is the culinary name for the flesh of a domestic pig (Sus scrofa 
        domesticus). It is the most commonly consumed meat worldwide,[1] with evidence
        of pig husbandry dating back to 5000 BC. Pork is eaten both freshly cooked and 
        preserved. Curing extends the shelf life of the pork products. Ham, smoked pork, 
        gammon, bacon and sausage are examples of preserved pork. Charcuterie is the 
        branch of cooking devoted to prepared meat products, many from pork. Pig is the 
        most popular meat in the Eastern and non-Muslim parts of Southeastern Asia 
        (Indochina, Philippines, Singapore, East Timor) and is also very common in the 
        Western world, especially in Central Europe. It is highly prized in Asian 
        cuisines for its fat content and pleasant texture. Consumption of pork is
        forbidden by Jewish, 
        Muslim and Rastafarian dietary law, for religious reasons, with several suggested
        possible causes.`,
      strType: null,
    },
    {
      idIngredient: '5',
      strIngredient: 'Avocado',
      strDescription:
        `The avocado, a tree with probable origin in South Central Mexico, is classified
        as a member of the flowering plant family Lauraceae. The fruit of the plant,
        also called an avocado (or avocado pear or alligator pear), is botanically
        a large berry containing a single large seed. Avocados are commercially
        valuable and are cultivated in tropical and Mediterranean climates throughout
        the world. They have a green-skinned, fleshy body that may be pear-shaped, 
        egg-shaped, or spherical. Commercially, they ripen after harvesting. Avocado 
        trees are partially self-pollinating, and are often propagated through grafting 
        to maintain predictable fruit quality and quantity. In 2017, Mexico produced 34% 
        of the world supply of avocados.`,
      strType: null,
    },
    {
      idIngredient: '9',
      strIngredient: 'Apple Cider Vinegar',
      strDescription:
        `Apple cider vinegar, or cider vinegar, is a vinegar made from fermented apple
        juice, and used in salad dressings, marinades, vinaigrettes, food preservatives,
        and chutneys. It is made by crushing apples, then squeezing out the juice.
        Bacteria and yeast are added to the liquid to start the alcoholic fermentation
        process, which converts the sugars to alcohol. In a second fermentation step,
        the alcohol is converted into vinegar by acetic acid-forming bacteria (Acetobacter
        species). Acetic acid and malic acid combine to give vinegar its sour taste. Apple
        cider vinegar has no medicinal or nutritional value. There is no high-quality
        clinical evidence that regular consumption of apple cider vinegar helps to
        maintain or lose body weight, or is effective to manage blood glucose and lipid
        levels.`,
      strType: null,
    },
    {
      idIngredient: '10',
      strIngredient: 'Asparagus',
      strDescription:
        `Asparagus, or garden asparagus,folk name sparrow grass, scientific name
        Asparagus officinalis, is a perennial flowering plant species in the genus
        Asparagus. Its young shoots are used as a spring vegetable. It was once
        classified in the lily family, like the related Allium species, onions and
        garlic. However, genetic research places lilies, Allium, and asparagus in three
        separate families—the Liliaceae, Amaryllidaceae, and Asparagaceae,
        respectively—with the Amaryllidaceae and Asparagaceae being grouped together
        in the order Asparagales. Sources differ as to the native range of Asparagus
        officinalis, but generally include most of Europe and western temperate Asia.
        It is widely cultivated as a vegetable crop.`,
      strType: null,
    },
    {
      idIngredient: '13',
      strIngredient: 'Baby Plum Tomatoes',
      strDescription:
        `The tomato is the edible, often red, berry of the plant Solanum lycopersicum,
        commonly known as a tomato plant. The species originated in western South America
        and Central America. The Nahuatl (Aztec language) word tomatl gave rise to the
        Spanish word tomate, from which the English word tomato derived.[3][4] Its
        domestication and use as a cultivated food may have originated with the
        indigenous peoples of Mexico. The Aztecs used tomatoes in their cooking at the
        time of the Spanish conquest of the Aztec Empire, and after the Spanish
        encountered the tomato for the first time after their contact with the Aztecs,
        they brought the plant to Europe. From there, the tomato was introduced to other
        parts of the European-colonized world during the 16th century.`,
      strType: null,
    },
    {
      idIngredient: '14',
      strIngredient: 'Bacon',
      strDescription:
        `Bacon is a type of salt-cured pork. Bacon is prepared from several different
        cuts of meat, typically from the pork belly or from back cuts, which have less
        fat than the belly. It is eaten on its own, as a side dish (particularly in
        breakfasts), or used as a minor ingredient to flavour dishes (e.g., the club
        sandwich). Bacon is also used for barding and larding roasts, especially game,
        including venison and pheasant. The word is derived from the Old High German
        bacho, meaning 'buttock', 'ham' or 'side of bacon', and is cognate with the
        Old French bacon.`,
      strType: null,
    },
    {
      idIngredient: '15',
      strIngredient: 'Baking Powder',
      strDescription:
        `Baking powder is a dry chemical leavening agent, a mixture of a carbonate or
        bicarbonate and a weak acid. The base and acid are prevented from reacting
        prematurely
        by the inclusion of a buffer such as cornstarch. Baking powder is used to increase
        the volume and lighten the texture of baked goods. It works by releasing carbon
        dioxide gas into a batter or dough through an acid-base reaction, causing bubbles
        in the wet mixture to expand and thus leavening the mixture. The first 
        single-acting baking powder was developed by Birmingham based food manufacturer
        Alfred Bird in England in 1843. The first double-acting baking powder was
        developed
        by Eben Norton Horsford in America in the 1860s.`,
      strType: null,
    },
    {
      idIngredient: '16',
      strIngredient: 'Balsamic Vinegar',
      strDescription:
        `Balsamic vinegar (Italian: aceto balsamico), occasionally shortened to
        balsamic, is a very dark, concentrated, and intensely flavoured vinegar
        originating in Italy, made wholly or partially from grape must. Grape must is
        freshly crushed grape juice with all the skins, seeds and stems.`,
      strType: null,
    },
    {
      idIngredient: '17',
      strIngredient: 'Basil',
      strDescription:
        `Basil, also called great basil, is a culinary herb of the family Lamiaceae
        (mints). Basil is native to tropical regions from central Africa to Southeast
        Asia. It is a tender plant, and is used in cuisines worldwide. Depending on
        the species and cultivar, the leaves may taste somewhat like anise, with a
        strong, pungent, often sweet smell.`,
      strType: null,
    },
    {
      idIngredient: '18',
      strIngredient: 'Basil Leaves',
      strDescription:
        `Basil, also called great basil, is a
        culinary herb of the family Lamiaceae (mints). `,
      strType: null,
    },
    {
      idIngredient: '19',
      strIngredient: 'Basmati Rice',
      strDescription:
        `Basmati is a variety of long, slender-grained aromatic rice which is
        traditionally from the Indian subcontinent. As of 2018-19, India exported
        to over 90% of the overseas basmati rice market, while Pakistan accounted
        for the remainder, according to the Indian state-run Agricultural and Processed
        Food Products Export Development Authority  and the Pakistan government-run
        Economic Survey of Pakistan. Many countries use domestically grown basmati
        rice crops; however, basmati is geographically exclusive to select districts
        of India, Pakistan, Nepal and Bangladesh.`,
      strType: null,
    },
    {
      idIngredient: '20',
      strIngredient: 'Bay Leaf',
      strDescription:
        `The bay leaf is an aromatic leaf commonly used in cooking. It can be
        used whole, or as dried and ground.`,
      strType: null,
    },
  ],
};

export default fetchGetIngredientsList;
