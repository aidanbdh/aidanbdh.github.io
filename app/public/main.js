(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict'

const shuffleWords = require('shuffle-words')

const words = require('../../valid-words.json')

module.exports = () => {
    const random = Math.floor(Math.random() * words.length - 1)

    const word = words[random]
        .split('')
        .filter((el, i) => words[random].indexOf(el) === i ? true : false)
        .join('')

    // fs.writeFileSync('./answers.txt', words[random])

    let output = shuffleWords(word, true).toUpperCase()

    while (!checkLetter(output[0]))
        output = shuffleWords(word, true)

    return {
        answer: words[random],
        output,
        difficulty: Number.parseInt(('' + random)[0]) + 1,
        words
    }
}

function checkLetter(letter) {
    const banList = 'xszjwq' // List of letters to not use as the starter
    return banList.indexOf(letter.toLowerCase()) === -1
}
},{"../../valid-words.json":5,"shuffle-words":4}],2:[function(require,module,exports){
 'use strict'

module.exports = (puzzle) => {
    return {
        check,
        findAnswer,
        updatePuzzle
    }
    // Checks if the word is the correct pangram
    function check(word) {
        return word.toUpperCase() === puzzle.answer.toUpperCase()
    }
    // Returns an array of possible answers to the pangram.
    function findAnswer() {
        return puzzle.words.filter(word => {
            for (let i = 0; i < puzzle.output.length; i++) {
                if (word.indexOf(puzzle.output[i].toLowerCase()) === -1)
                    return false
            }

            return true
        })
    }

    function updatePuzzle(newPuzzle) {
        return puzzle = newPuzzle
    }
}

},{}],3:[function(require,module,exports){
'use strict'

const generate = require('../logic/generate.js')

let puzzle = generate()

const scripts = require('../logic/solve.js')(puzzle)

const $generate = document.getElementById('generate')
const $puzzle = document.getElementById('puzzle')

$generate.addEventListener('click', () => {
    puzzle = generate()
    scripts.updatePuzzle(puzzle)

    displayPuzzle()
})

const $answerInput = document.getElementById('answer-input')
const $checkAnswer = document.getElementById('check-answer')
const $results = document.getElementById('results')

$checkAnswer.addEventListener('click', () => {
    const text = $answerInput.value

    if(scripts.check(text))
        $results.textContent = 'That is the pangram! Congradulations!'
    else
        $results.textContent = 'That is not the pangram, try again.'

    $results.classList = ''
})

const $showAnswer = document.getElementById('show-answer')
const $answer = document.getElementById('answer')
const $hideAnswer = document.getElementById('hide-answer')

$showAnswer.addEventListener('click', () => {
    $answer.textContent = puzzle.answer

    $showAnswer.classList.add('hidden')
    $answer.classList.remove('hidden')
    $hideAnswer.classList.remove('hidden')
})

$hideAnswer.addEventListener('click', () => {
    $answer.classList.add('hidden')
    $hideAnswer.classList.add('hidden')
    $showAnswer.classList.remove('hidden')
})

console.log('Width: ' + window.outerWidth)

const $body = document.getElementsByTagName('body')[0]
const $buttons = document.getElementsByTagName('button')
const $inputs = document.getElementsByTagName('input')

window.mobilecheck = function () {
    var check = false
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check
}

if(window.outerWidth < 960 || window.mobilecheck()) {
    $body.classList.add('mobile')

    console.log($buttons)
    for(let i = 0; i < $buttons.length; i++) {
        console.log($buttons[i])
        $buttons[i].classList.add('mobile')
    }

    for (let i = 0; i < $inputs.length; i++) {
        $inputs[i].classList.add('mobile')
    }
} 

// This function displays the puzzle along with the difficulty.
function displayPuzzle() {
    const str = '\n\t' + puzzle.output[2] + 
        '\n' + puzzle.output[1] + '\t\t' + puzzle.output[3] + 
        '\n\t' + puzzle.output[0] + 
        '\n' + puzzle.output[6] + '\t\t' + puzzle.output[4] +
        '\n\t' + puzzle.output[5] + 
        '\n\nDifficulty: ' + puzzle.difficulty + '\n\n '
    
    $puzzle.textContent = str

    $answerInput.value = ''
    $results.classList.add('hidden')

    $answer.textContent = ''

    $answer.classList.add('hidden')
    $hideAnswer.classList.add('hidden')
    $showAnswer.classList.remove('hidden')
}

displayPuzzle()
},{"../logic/generate.js":1,"../logic/solve.js":2}],4:[function(require,module,exports){
/*!
 * shuffle-words <https://github.com/jonschlinkert/shuffle-words>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(str, letters) {
  var words = str.split(' ');

  // see: http://stackoverflow.com/a/6274398/1267639
  function shuffle(arr) {
    var len = arr.length;
    var swap;
    var i;

    while (len > 0) {
      i = Math.floor(Math.random() * len);
      len--;
      swap = arr[len];
      arr[len] = arr[i];
      arr[i] = swap;
    }
    return arr;
  }

  if (letters) {
    words = words.map(function(word) {
      return shuffle(word.split('')).join('');
    });
  }
  return shuffle(words).join(' ');
};


},{}],5:[function(require,module,exports){
module.exports=["although","experience","identify","interview","politics","somebody","positive","generally","additional","associate","intelligence","classroom","appropriate","literature","scientific","consequence","minority","accident","eliminate","producer","celebrate","existing","transition","interview","ordinary","numerous","concentrate","dimension","literally","normally","advocate","disagree","literary","delivery","attractive","regularly","transfer","defensive","limitation","provider","principal","interrupt","compound","occasional","peaceful","accommodate","pleasant","cooperate","afterward","ministry","dissolve","correctly","sensation","disabled","associate","rational","perceived","homework","explicit","foreigner","stereotype","marijuana","inability","adaptation","litigation","persistent","nationally","anything","transplant","proposition","handling","guerrilla","financially","contrary","unidentified","socialist","supervise","newcomer","precedent","astronaut","intimacy","sweeping","nitrogen","dressing","controller","caregiver","socioeconomic","multiply","notorious","steering","fertilizer","Brazilian","skeleton","sergeant","promptly","paradise","ammunition","steroids","coherent","intensely","sunglasses","subscriber","allegiance","subsidize","visibility","incorrect","severity","examiner","impatient","daunting","validate","directive","harmless","enjoyment","unsuccessful","uprising","adulthood","fiercely","resonate","executive","grouping","sociology","preclude","infected","converge","dwelling","Dominican","abnormal","stainless","synthesis","superpower","overtime","footprint","unpopular","parasite","Hispanic","doctorate","affective","paranoid","battalion","freelance","upheaval","licensed","cranberry","alphabet","advancing","aesthetics","ruthless","luminous","oppressive","intimidation","interpretive","pioneering","postseason","receptive","dissipate","impaired","hegemony","convergence","cosmetics","approved","analogous","precipitate","sixteenth","cheerleader","dissatisfied","projector","headnote","rosemary","forestry","mediocre","margarine","redesign","emigrate","investing","subgroup","induction","viability","distorted","accelerated","unprepared","forgiving","leukemia","defective","militarily","antioxidant","concerted","symposium","homelessness","assertive","offensive","secretive","logically","deceptive","balancing","legitimize","enlighten","spaceship","dashboard","threatened","Caucasian","fidelity","airwaves","protrude","essential","enclosed","bullying","mitigation","processed","summertime","inequity","vascular","untreated","horribly","sentencing","freestyle","yearning","concealed","sentencing","marinade","pedagogy","healthful","carnival","silicone","westward","registry","airfield","disregard","piercing","wondrous","egregious","cherished","juvenile","transistor","mindless","standout","increment","deafening","cashmere","dislodge","inconvenient","endeavor","homemaker","allegory","propriety","crippling","conjunction","sustenance","lightweight","irritable","intersperse","admonition","overload","contrary","chastise","polluter","flooring","punishing","caseload","eyesight","newsstand","insertion","affluence","anyplace","botanist","adaptable","severance","stallion","reflected","enriched","crippled","effortless","disillusion","whomever","starship","pursuant","grounding","forwards","detectable","quandary","acoustic","concierge","speckled","hairline","attitudinal","mournful","sabbatical","swirling","arbitrarily","annihilation","jumpsuit","shambles","eccentricity","downpour","feathered","midpoint","dissimilar","accession","airspace","frenetic","hallowed","popularly","mackerel","bottomless","crossfire","eloquence","flowered","succulent","bouncing","merciless","dynamism","inaccuracy","ancillary","firecracker","untenable","peacemaker","stampede","reassign","solicitor","pancreas","insensitivity","steelhead","regrettable","microchip","finisher","hideaway","indecision","spending","unchanging","foolishly","intoxication","connectedness","mannerism","squabble","heartless","excision","impurity","puncture","tightness","vengeful","playback","countenance","foursome","abrasion","negation","earphone","asterisk","episodic","deodorant","drunkenness","turpentine","contagion","neophyte","overjoyed","isolationist","lightbulb","corkscrew","unplugged","glassware","peroxide","uninvited","intensified","enlistment","showcase","derivative","laziness","incapacitate","retreating","storehouse","confetti","repairman","shadowed","infallible","middleman","rangeland","solidity","delirium","forklift","shrubbery","wastebasket","diabolical","coldness","starring","shrunken","irradiation","watercress","divinely","trombone","orbiting","encyclical","irreparable","arrhythmia","employed","originator","irrigated","overpass","cookware","wariness","ebullient","absorbed","detonator","indecisive","grasping","legalized","yielding","eugenics","applesauce","activated","unopposed","crosshair","slippage","bloodline","immensity","fatalism","retractable","constancy","acclimate","supposing","medicate","pinstripe","afterward","capillary","satirize","sparring","bluebird","flagpole","dramatist","blurring","epilogue","reverently","deadlock","glittery","statehouse","Estonian","redeploy","indebtedness","apportion","requested","corrective","minuteman","catalyze","flatness","carotene","artisanal","protectorate","reopening","palliative","sauerkraut","redevelop","unhelpful","kingship","Athenian","endocrine","Keynesian","allspice","bloodbath","segmented","reinforcer","crackpot","chiseled","hitchhiker","analogical","mounting","stepparent","headrest","guardrail","secretariat","mandolin","separateness","woodsman","swallowed","portobello","concealer","eventful","backhand","specious","millionth","pullback","ventilate","Socratic","cerulean","burgundy","kitchenette","uncannily","deviance","voiceless","anteroom","undeserved","civilizing","incapacity","harangue","impolite","sartorial","scraggly","reachable","gravelly","tincture","timelessness","radicchio","lycopene","dockside","inveterate","tailspin","insomniac","monorail","gunfight","tableware","prospect","pitifully","treehouse","maxillary","validated","turnabout","rapturous","decoding","Kashmiri","dalliance","doorjamb","tangential","smoothie","attenuation","convocation","speedily","chanting","typeface","semiotics","undulate","councilor","thwarted","desirous","teachable","epigraph","incoherence","peripatetic","bothered","silenced","schoolbook","rosebush","thievery","composed","drifting","snowbank","stupidest","barrister","sodomize","regrowth","philology","avionics","whiplash","debilitate","convivial","tamarind","chickadee","arbitrage","vomiting","gendarme","enlightening","harangue","uninjured","selector","dogfight","unlawfully","homologous","accusing","pivoting","decorous","sloppiness","unbalance","bassinet","sluggishly","funereal","retained","dismembered","narrowed","fetishism","trenchant","immodest","headwind","instigation","daintily","degrading","workgroup","imperiled","crocheted","roadshow","flapping","sharpener","hollowness","oleander","erythema","marzipan","Moravian","protozoan","operable","banknote","gravedigger","smuggled","rehydrate","sightseer","undesired","fiendish","bookmaker","chillingly","goalpost","indicated","proofread","archrival","honorific","highlighted","crabapple","constructor","breakaway","spitball","proboscis","intermix","sauropod","prescience","tractable","aeroplane","quatrain","cliffside","negligently","aperitif","borderless","autobahn","nectarine","deforested","phantasm","bratwurst","militarist","ostentation","offending","appraised","scofflaw","privateer","grueling","Wilsonian","wallboard","resupply","Eritrean","deaconess","hydrated","haemorrhage","fossilize","meddling","laughably","bioscience","retributive","gorgonzola","intranasal","evaporator","racecourse","touristy","showboat","cadaveric","unranked","ambrosia","unloaded","twitching","paperboy","pungency","abstinent","intercity","bobblehead","italicize","hydroxyl","handcart","excellently","substratum","homepage","feminized","overcooked","preformed","cruciform","scintilla","keiretsu","penstemon","brownout","tricorder","frugally","bluebonnet","photoreceptor","drubbing","unlearned","tentativeness","safehouse","coarseness","sonority","jingoism","Assyrian","shabbily","graywater","ironstone","rezoning","picketer","rampaging","sibilant","paraplegia","machining","magnetar","peacenik","smilingly","libelous","unindicted","supplied","townsman","truculent","narrowing","forecourt","neutering","slothful","Patagonian","wheezing","moistness","demitasse","unleavened","apostolate","alopecia","chewable","bouffant","blending","phosphoric","icehouse","frowning","millenarian","sealskin","pinewood","whosoever","proprietress","Malaysian","tastemaker","squiggle","blackfly","corkboard","spasticity","theoretic","encoding","contortionist","spotlessly","cremated","obsessiveness","resistivity","sultanate","glitterati","debilitated","earthward","supersize","touristic","convening","egoistic","jailbird","collarless","interpreting","subspace","chirping","majolica","glimmering","stubbled","clanking","scabrous","overheard","strutting","sickened","icemaker","duodenal","Jacobean","bookmobile","ticketing","liminality","dockyard","fixative","sodomite","bellyache","Senegalese","lodestone","gasifier","dairyman","marrying","tidewater","expander","lionfish","unhealed","suntanned","obtuseness","gimmickry","aerialist","expiring","mediaeval","tuberous","effortful","bowrider","etiologic","decathlete","cellulitis","thirdhand","delineated","bounding","turpitude","undreamed","calamine","jackboot","grayling","terrapin","gameplay","unclouded","chambray","birdcall","fledging","unsought","polygonal","saturnian","autosomal","somnolence","ammonite","fissured","sinecure","debenture","antinomy","bestride","rotating","lecithin","unnameable","rescission","burbling","scorekeeper","gristmill","rhomboid","cartload","lockable","fencerow","mustiness","giantess","misnamed","domicile","reproduced","coloratura","demoiselle","channeled","demiurge","humaneness","disclosed","extratextual","layabout","ballcarrier","methionine","Manichaean","patrician","metallic","overdeveloped","reprobate","rounders","animality","Sahelian","imagistic","phonebook","monomaniacal","carnelian","fatiguing","Thracian","marchese","technics","ballooning","kaffiyeh","headspace","darnedest","hireling","scrollwork","geoeconomic","unchosen","Catalonian","driverless","derisory","laughing","engorgement","cabalistic","plebeian","schoolbus","summoning","hacendado","hadrosaur","squareness","nailhead","drabness","gloating","masticate","spaetzle","grogginess","meteoroid","dromedary","hypercar","tunelessly","predecease","plantsman","spectroscope","guayabera","preeminent","unfurling","bacchanalia","metalhead","ringless","mesoscopic","stripping","rockfall","deceiving","overdevelop","interiorize","cordovan","quadruped","estancia","gleanings","unkindness","vomiting","ruminant","bleeding","eastward","bathetic","Parthian","ticketing","brusqueness","edibility","grapeseed","epiphanic","beechnut","spookily","housetop","thiamine","blondness","ethereally","surrounded","trellised","osteogenesis","redoubled","stifling","flautist","underline","incisional","swingset","braising","hairdryer","entailment","datastream","abasement","cramming","livelong","creepiness","ephemeris","rheostat","airshaft","flattish","villainess","encircled","slimeball","oxidizing","Eurasian","superglue"]
},{}]},{},[3]);
