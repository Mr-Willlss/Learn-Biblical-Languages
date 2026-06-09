// Biblical Hebrew lesson data rebuilt from Biblical Hebrew: Step by Step
'use strict';

const v = (hebrew, transliteration, english, example) => ({ hebrew, transliteration, english, example });
const mc = (question, options, answer, explanation) => ({
  type: 'multiple_choice',
  question,
  options,
  answer,
  explanation
});
const tr = (question, options, answer, explanation) => ({
  type: 'translate_to_english',
  question,
  options,
  answer,
  explanation
});
const lesson = (id, world, title, objective, theory, vocabulary, exercises, xpReward) => ({
  id,
  world,
  isRTL: true,
  title,
  objective,
  theory,
  videoUrl: '',
  vocabulary,
  exercises,
  xpReward
});

const HEBREW_LESSON_DATA = Object.fromEntries([
  lesson(
    1, 1,
    'A Brief Survey of the Semitic Languages',
    'Explain where Hebrew fits inside the Semitic family and name a few shared traits.',
    `Lesson 1 introduces Hebrew as part of the Semitic language family. The lesson focuses on the shared traits that help Hebrew students read with confidence: consonantal roots, related sound patterns, gutturals, and suffixes. It also sets Hebrew beside languages such as Aramaic, Arabic, and Akkadian.`,
    [
      v('שֵׁם', 'shem', 'name', 'The term Semitic is linked to Shem.'),
      v('שֹׁרֶשׁ', 'shoresh', 'root', 'Many Hebrew words grow from a three-letter root.'),
      v('לָשׁוֹן', 'lashon', 'language / tongue', 'Hebrew is one of the main Semitic languages.')
    ],
    [
      mc('Which language family includes Hebrew?', ['Semitic', 'Romance', 'Slavic', 'Germanic'], 'Semitic', 'Hebrew belongs to the Semitic family.'),
      tr('What does שֹׁרֶשׁ mean?', ['root', 'house', 'king', 'letter'], 'root', 'Root-based vocabulary is central to Hebrew.')
    ],
    12
  ),
  lesson(
    2, 1,
    'The Hebrew Alphabet',
    'Recognize the 22 Hebrew consonants, their order, and their final forms.',
    `Lesson 2 covers the Hebrew alphabet in order. The student learns that Hebrew uses consonants, that letters stand alone, and that five letters take special final forms at the end of a word. The lesson also introduces the idea of the dagesh in the begadkefat letters.`,
    [
      v('א', 'aleph', 'glottal stop / silent carrier', 'Aleph is the first letter of the alphabet.'),
      v('בּ / ב', 'bet / vet', 'b or v', 'Bet may be hard or soft depending on the dagesh.'),
      v('ך', 'final kaf', 'final kh', 'Five letters change shape at the end of a word.')
    ],
    [
      mc('How many letters are in the Hebrew alphabet?', ['22', '24', '26', '28'], '22', 'Hebrew has 22 consonants.'),
      tr('What does א represent?', ['a consonant with a glottal sound', 'the letter m', 'a vowel', 'a final form only'], 'a consonant with a glottal sound', 'Aleph is pronounced as a glottal stop or silent carrier.')
    ],
    12
  ),
  lesson(
    3, 1,
    'Phonology',
    'Hear and distinguish the main Hebrew consonant sounds, especially the gutturals.',
    `Lesson 3 focuses on pronunciation. The book explains how several consonants sound in Biblical Hebrew, how to tell similar letters apart, and why the gutturals matter. Careful pronunciation helps the student read unpointed text more accurately.`,
    [
      v('ח', 'het', 'guttural kh / ḥ', 'This sound is produced deep in the throat.'),
      v('ע', 'ayin', 'guttural ʿ', 'Ayin is a guttural consonant.'),
      v('שׁ', 'shin', 'sh', 'Shin is not the same as sin.')
    ],
    [
      mc('Which letter is a guttural?', ['ע', 'מ', 'נ', 'ל'], 'ע', 'Ayin is one of the guttural consonants.'),
      tr('What does ח represent in this lesson?', ['a guttural kh-like sound', 'a vowel', 'a silent final letter', 'a double consonant'], 'a guttural kh-like sound', 'Het is pronounced as a guttural consonant.')
    ],
    14
  ),
  lesson(
    4, 1,
    'Origins of the Hebrew Alphabet',
    'Describe the move from the ancient script to the square script used today.',
    `Lesson 4 traces the history of Hebrew writing. It begins with the older Phoenician or Paleo-Hebrew script and explains how the later square script developed through Aramaic influence. The student also sees why the script used in printed Hebrew looks the way it does today.`,
    [
      v('כְּתָב קָדוּם', 'ketav qadum', 'ancient script', 'Early Hebrew used an older Canaanite style.'),
      v('כְּתָב מְרֻבָּע', 'ketav meruba', 'square script', 'This is the script used in printed Hebrew today.'),
      v('פְּנִיקִי', 'pheniki', 'Phoenician', 'The Phoenician script influenced Hebrew writing.')
    ],
    [
      mc('Which script is used in printed Hebrew today?', ['Square script', 'Cuneiform', 'Hieroglyphic', 'Latin'], 'Square script', 'The modern Hebrew print form is the square script.'),
      tr('What does כְּתָב קָדוּם mean?', ['ancient script', 'new alphabet', 'vowel system', 'final letter'], 'ancient script', 'The lesson traces Hebrew back to older writing systems.')
    ],
    14
  ),
  lesson(
    5, 1,
    'Vowels',
    'Recognize the common vowel signs and understand the role of the sheva.',
    `Lesson 5 introduces vowel points. The student learns that Hebrew is read with consonants plus vowel signs, and that the sheva may be silent or very short. Mastering the vowel system is the key to reading pointed biblical text with confidence.`,
    [
      v('פַּתַח', 'patach', 'short a-like vowel', 'A patach often sounds like a short a.'),
      v('צֵירֵה', 'tsere', 'e-like vowel', 'Tsere is commonly read with an e sound.'),
      v('שְׁוָא', 'sheva', 'very short or silent vowel', 'Sheva can be silent or lightly pronounced.')
    ],
    [
      mc('What is the sheva usually like?', ['Always a full vowel', 'Sometimes silent or very short', 'Always long', 'A consonant'], 'Sometimes silent or very short', 'The sheva may be silent or reduced.'),
      tr('What does צֵירֵה sound like?', ['e', 'a', 'o', 'u'], 'e', 'Tsere is generally an e-like vowel.')
    ],
    16
  ),
  lesson(
    6, 2,
    'Gender; Conjunction Waw; Definite Article',
    'Identify grammatical gender, the conjunction waw, and the definite article.',
    `Lesson 6 moves from reading into grammar. Hebrew nouns are marked for gender, the conjunction waw means and, and the definite article ha- marks a noun as specific. These three ideas appear constantly in biblical prose and poetry.`,
    [
      v('הַ', 'ha-', 'the', 'The definite article makes a noun specific.'),
      v('וְ', 've-', 'and', 'Waw commonly means and.'),
      v('זָכָר / נְקֵבָה', 'zakar / nekevah', 'masculine / feminine', 'Gender is important for agreement.')
    ],
    [
      mc('What does הַ mean?', ['the', 'and', 'to', 'from'], 'the', 'The article ha- marks a definite noun.'),
      tr('What does וְ mean?', ['and', 'not', 'like', 'in'], 'and', 'Waw is the common conjunction and.')
    ],
    16
  ),
  lesson(
    7, 2,
    'Adjectives',
    'Match adjectives with the nouns they describe in gender and number.',
    `Lesson 7 explains how adjectives agree with nouns. The student learns that adjectives follow the noun in Hebrew and must match gender and number. This lesson makes short descriptive phrases easier to read.`,
    [
      v('גָּדוֹל', 'gadol', 'big / great', 'A masculine adjective form.'),
      v('גְּדוֹלָה', 'gedolah', 'big / great', 'A feminine adjective form.'),
      v('יָפֶה', 'yafeh', 'beautiful', 'Adjectives agree with the noun they describe.')
    ],
    [
      mc('An adjective in Hebrew must agree with the noun in:', ['gender and number', 'only tense', 'only case', 'only root letters'], 'gender and number', 'Adjectives match the noun.'),
      tr('What does גְּדוֹלָה mean?', ['big / great (feminine)', 'small', 'new', 'wise'], 'big / great (feminine)', 'This is the feminine form of big/great.')
    ],
    18
  ),
  lesson(
    8, 2,
    'Quiz on Lessons 1-7',
    'Review the alphabet, vowels, gender, and adjective agreement from the opening lessons.',
    `Lesson 8 is a checkpoint. The book uses a quiz to make sure the learner can still recognize the alphabet, read vowels, and notice basic grammar patterns before moving on to nouns and pronouns.`,
    [
      v('א', 'aleph', 'the first letter', 'Review of the alphabet.'),
      v('שְׁוָא', 'sheva', 'silent or short vowel', 'Review of vowel reduction.'),
      v('גָּדוֹל', 'gadol', 'big / great', 'Review of adjective agreement.')
    ],
    [
      mc('Which of these is a vowel sign?', ['שְׁוָא', 'וְ', 'ח', 'מ'], 'שְׁוָא', 'The sheva is a vowel sign.'),
      tr('What does גָּדוֹל mean?', ['big / great', 'and', 'root', 'letter'], 'big / great', 'The masculine adjective means big or great.'),
      mc('What does the conjunction waw mean?', ['and', 'the', 'not', 'from'], 'and', 'Waw is the common conjunction.')
    ],
    20
  ),
  lesson(
    9, 2,
    'Nouns with Adjectives; Plurals; Definite Article',
    'Read simple noun phrases that use adjectives, plurals, and the article.',
    `Lesson 9 expands from single words into phrases. The learner studies noun + adjective patterns, learns how plural forms behave, and keeps an eye on the definite article that often appears in front of the noun.`,
    [
      v('בַּיִת', 'bayit', 'house', 'A common noun used in simple phrases.'),
      v('בָּתִּים', 'batim', 'houses', 'Plural forms are essential in reading.'),
      v('קָדוֹשׁ', 'qadosh', 'holy', 'Adjectives still agree with the noun.')
    ],
    [
      mc('What does בָּתִּים mean?', ['houses', 'king', 'vowel', 'article'], 'houses', 'This is the plural of house.'),
      tr('What does בַּיִת mean?', ['house', 'peace', 'root', 'and'], 'house', 'Bayit means house.')
    ],
    20
  ),
  lesson(
    10, 2,
    'Segholate Nouns; Personal Pronouns; Present Tense of To Be',
    'Recognize segholate nouns and basic personal pronouns in simple sentences.',
    `Lesson 10 introduces segholate nouns and the basic personal pronouns. The lesson also explains that Hebrew often omits the present tense of to be in simple sentences, so the learner must read the sentence naturally rather than expect an English-style verb.`,
    [
      v('מֶלֶךְ', 'melekh', 'king', 'A common segholate noun.'),
      v('הוּא', 'hu', 'he / it', 'Basic personal pronoun.'),
      v('הִיא', 'hi', 'she / it', 'Basic feminine pronoun.')
    ],
    [
      mc('What does הוּא mean?', ['he / it', 'and', 'king', 'house'], 'he / it', 'Hu is the masculine pronoun.'),
      tr('What does מֶלֶךְ mean?', ['king', 'queen', 'root', 'water'], 'king', 'Melekh is a segholate noun meaning king.')
    ],
    22
  ),
  lesson(
    11, 3,
    'Review of Lessons 1-10',
    'Review the first half of the course before moving into verb study.',
    `Lesson 11 is a major review lesson. It revisits the alphabet, vowels, gender, adjectives, plural forms, pronouns, and the most important reading habits. This prepares the learner for the verb system that follows.`,
    [
      v('שֹׁרֶשׁ', 'shoresh', 'root', 'Roots are central to Hebrew vocabulary.'),
      v('הַ', 'ha-', 'the', 'The article appears constantly in reading.'),
      v('מֶלֶךְ', 'melekh', 'king', 'A useful review noun.')
    ],
    [
      mc('Which skill belongs to the first ten lessons?', ['Reading vowels and noun agreement', 'Parsing Greek participles', 'Drawing cuneiform tablets', 'Memorizing Roman numerals'], 'Reading vowels and noun agreement', 'The first half of the course is built on reading basics.'),
      tr('What does שֹׁרֶשׁ mean?', ['root', 'king', 'great', 'daughter'], 'root', 'Root is one of the course’s key ideas.'),
      mc('What does הַ mark?', ['the definite article', 'the dual number', 'a verb tense', 'a plural ending'], 'the definite article', 'Ha- marks a specific noun.')
    ],
    24
  ),
  lesson(
    12, 3,
    'Verbs',
    'Identify the basic idea of Hebrew verb roots and the value of the three-letter pattern.',
    `Lesson 12 begins the verb section. The student learns to look for the root letters first and to recognize that verbs are built from regular patterns. This lesson lays the groundwork for understanding conjugation and voice.`,
    [
      v('כָּתַב', 'katav', 'he wrote', 'A common verb root for writing.'),
      v('לָמַד', 'lamad', 'he learned', 'A common verb root for learning.'),
      v('שָׁמַר', 'shamar', 'he kept / guarded', 'A common verb root for keeping.')
    ],
    [
      mc('What do Hebrew verbs usually depend on?', ['Root letters and patterns', 'Case endings', 'Capital letters', 'Articles only'], 'Root letters and patterns', 'Verb meaning is tied to the root pattern.'),
      tr('What does כָּתַב mean?', ['he wrote', 'he learned', 'he went', 'he saw'], 'he wrote', 'Katav is a basic writing verb.')
    ],
    24
  ),
  lesson(
    13, 3,
    'Present Tense; More About Gender',
    'Read present-tense forms and notice how gender still affects agreement.',
    `Lesson 13 teaches the present tense as it appears in Hebrew and keeps gender in view. The learner sees that nouns, adjectives, and participles still need to agree, so gender remains important in every section of the language.`,
    [
      v('כּוֹתֵב', 'kotev', 'writing / he writes', 'Masculine present form.'),
      v('כּוֹתֶבֶת', 'kotevet', 'writing / she writes', 'Feminine present form.'),
      v('טוֹב', 'tov', 'good', 'Agreement continues to matter.')
    ],
    [
      mc('Which form is feminine?', ['כּוֹתֶבֶת', 'כּוֹתֵב', 'מֶלֶךְ', 'בַּיִת'], 'כּוֹתֶבֶת', 'Kotevet is the feminine form.'),
      tr('What does כּוֹתֵב mean?', ['writing / he writes', 'house', 'king', 'and'], 'writing / he writes', 'Kotev is the masculine present form.')
    ],
    26
  ),
  lesson(
    14, 3,
    'More About Verbs',
    'Deepen your understanding of verb forms, patterns, and how they build meaning.',
    `Lesson 14 expands the verb discussion with more examples and pattern recognition. The lesson strengthens the student’s ability to notice how forms change while the root remains the same. That skill becomes essential for reading longer passages.`,
    [
      v('אָמַר', 'amar', 'he said', 'A highly common biblical verb.'),
      v('בָּנָה', 'banah', 'he built', 'A simple and useful root.'),
      v('הָלַךְ', 'halakh', 'he walked / went', 'A very frequent narrative verb.')
    ],
    [
      mc('What stays most important when reading Hebrew verbs?', ['The root letters', 'The English article', 'The page number', 'The marginal notes'], 'The root letters', 'The root is the core of the meaning.'),
      tr('What does אָמַר mean?', ['he said', 'he walked', 'he wrote', 'he made'], 'he said', 'Amar is one of the most common verbs.')
    ],
    26
  ),
  lesson(
    15, 3,
    'Demonstrative Pronouns and Adjectives',
    'Use this, that, these, and those forms in simple Hebrew phrases.',
    `Lesson 15 introduces demonstratives. The learner studies the words used for this and that, and sees how demonstrative forms work alongside nouns and adjectives. This helps the student read short descriptive phrases naturally.`,
    [
      v('זֶה', 'zeh', 'this / this one', 'Masculine singular demonstrative.'),
      v('זֹאת', 'zot', 'this / this one', 'Feminine singular demonstrative.'),
      v('אֵלֶּה', 'elleh', 'these', 'Plural demonstrative.')
    ],
    [
      mc('Which word is feminine singular?', ['זֹאת', 'זֶה', 'אֵלֶּה', 'הוּא'], 'זֹאת', 'Zot is the feminine singular form.'),
      tr('What does אֵלֶּה mean?', ['these', 'that', 'king', 'not'], 'these', 'Elleh is the plural demonstrative.')
    ],
    28
  ),
  lesson(
    16, 4,
    'Prepositions',
    'Recognize the most common Hebrew prepositions attached to the front of words.',
    `Lesson 16 explains how Hebrew prepositions are often prefixed to a noun. The learner practices the basic forms for in, to, and like, which appear everywhere in biblical Hebrew prose and poetry.`,
    [
      v('בְּ', 'be-', 'in / with', 'A common prefixed preposition.'),
      v('לְ', 'le-', 'to / for', 'Another very common prefix.'),
      v('כְּ', 'ke-', 'like / as', 'Used for comparison.')
    ],
    [
      mc('What does בְּ often mean?', ['in / with', 'not', 'or', 'the'], 'in / with', 'Be- is a basic preposition.'),
      tr('What does לְ mean?', ['to / for', 'and', 'house', 'peace'], 'to / for', 'Le- is a common Hebrew prefix.')
    ],
    28
  ),
  lesson(
    17, 4,
    'Relative Pronouns; Hebrew Particle את',
    'Identify the word that links clauses and the marker of the direct object.',
    `Lesson 17 introduces relative clauses and the direct-object marker. The book stresses that these forms help the reader see how clauses connect and how a direct object is identified in Hebrew prose.`,
    [
      v('אֲשֶׁר', 'asher', 'who / that / which', 'A common relative pronoun.'),
      v('אֶת', 'et', 'direct-object marker', 'Marks the definite direct object.'),
      v('מִן', 'min', 'from', 'A frequent short preposition.')
    ],
    [
      mc('Which word marks the direct object?', ['אֶת', 'אֲשֶׁר', 'מִן', 'הַ'], 'אֶת', 'Et marks a definite direct object.'),
      tr('What does אֲשֶׁר mean?', ['who / that / which', 'in', 'good', 'two'], 'who / that / which', 'Asher introduces a relative clause.')
    ],
    30
  ),
  lesson(
    18, 4,
    'Review of Lessons 12-17',
    'Review the verb section, demonstratives, prepositions, and clause markers.',
    `Lesson 18 is a mid-course review. It revisits the main verb roots, present-tense forms, demonstratives, prepositions, and the relative pronoun. The lesson keeps the learner from moving forward with shaky foundations.`,
    [
      v('כָּתַב', 'katav', 'he wrote', 'Review of the verb root.'),
      v('זֶה', 'zeh', 'this', 'Review of demonstratives.'),
      v('אֶת', 'et', 'direct-object marker', 'Review of clause structure.')
    ],
    [
      mc('Which word is a demonstrative?', ['זֶה', 'אֶת', 'מִן', 'כְּ'], 'זֶה', 'Zeh means this.'),
      tr('What does אֶת mark?', ['the direct object', 'the plural', 'the article', 'the future tense'], 'the direct object', 'Et marks the direct object in Hebrew.'),
      mc('Which form means from?', ['מִן', 'לְ', 'הַ', 'זֹאת'], 'מִן', 'Min means from.')
    ],
    32
  ),
  lesson(
    19, 4,
    'Review Test',
    'Check your grasp of the course so far before moving into more advanced grammar.',
    `Lesson 19 is a formal review test. The aim is not to introduce new grammar but to confirm that the learner can still recognize forms from the alphabet, basic syntax, verbs, and common particles.`,
    [
      v('הַ', 'ha-', 'the', 'Review of the definite article.'),
      v('כּוֹתֵב', 'kotev', 'writing / he writes', 'Review of present forms.'),
      v('אֲשֶׁר', 'asher', 'who / that / which', 'Review of relative clauses.')
    ],
    [
      mc('Which word is the article?', ['הַ', 'מִן', 'אֶת', 'זֶה'], 'הַ', 'Ha- is the definite article.'),
      tr('What does כּוֹתֵב mean?', ['writing / he writes', 'king', 'from', 'this'], 'writing / he writes', 'Kotev is the masculine present form.'),
      mc('Which word means who / that / which?', ['אֲשֶׁר', 'לְ', 'בְּ', 'גָּדוֹל'], 'אֲשֶׁר', 'Asher is the relative pronoun.')
    ],
    34
  ),
  lesson(
    20, 4,
    'Verbs With Guttural Root-Letters; More About Gender',
    'Read verbs whose roots include guttural consonants and notice the effect on forms.',
    `Lesson 20 explores how guttural letters can affect verb patterns and pronunciation. The lesson also returns to gender, since Hebrew forms often change according to whether a noun or verb form is masculine or feminine.`,
    [
      v('רוּחַ', 'ruach', 'spirit / wind', 'A common noun containing a guttural.'),
      v('עַם', 'am', 'people', 'A short noun with a guttural.'),
      v('חָזָק', 'chazaq', 'strong', 'A useful adjective with gutturals.')
    ],
    [
      mc('What can guttural consonants affect?', ['Verb patterns and pronunciation', 'Only English spelling', 'Only the article', 'Nothing at all'], 'Verb patterns and pronunciation', 'Gutturals can influence how forms are pronounced.'),
      tr('What does רוּחַ mean?', ['spirit / wind', 'house', 'king', 'and'], 'spirit / wind', 'Ruach is a common biblical noun.')
    ],
    34
  ),
  lesson(
    21, 5,
    'Sentences in the Negative; Declension of Nouns in the Singular',
    'Form simple negative statements and observe singular noun patterns.',
    `Lesson 21 shows how Hebrew expresses negation and how singular nouns behave in common patterns. The learner reads short statements that rely on the negative particle and simple noun forms.`,
    [
      v('לֹא', 'lo', 'not', 'The simplest negative particle.'),
      v('אֵין', 'ein', 'there is not / there is no', 'A common negative expression.'),
      v('בֵּן', 'ben', 'son', 'A frequent singular noun.')
    ],
    [
      mc('What does לֹא mean?', ['not', 'and', 'from', 'this'], 'not', 'Lo is the basic negative particle.'),
      tr('What does אֵין mean?', ['there is not / there is no', 'son', 'house', 'root'], 'there is not / there is no', 'Ein is a common negative expression.')
    ],
    36
  ),
  lesson(
    22, 5,
    'Dual Number',
    'Recognize the special dual form used for pairs and natural twos.',
    `Lesson 22 introduces the dual number. Hebrew has a special form for paired items and natural pairs such as hands, eyes, and feet. This lesson helps the learner spot that pattern in reading.`,
    [
      v('יָדַיִם', 'yadayim', 'two hands', 'A classic dual form.'),
      v('רַגְלַיִם', 'raglayim', 'two feet', 'Another common dual form.'),
      v('שְׁתַּיִם', 'shtayim', 'two (feminine)', 'Dual-related number form.')
    ],
    [
      mc('What does the dual number usually show?', ['A pair', 'A negative', 'A verb tense', 'A root letter'], 'A pair', 'The dual form is used for paired items.'),
      tr('What does יָדַיִם mean?', ['two hands', 'two kings', 'two roots', 'two articles'], 'two hands', 'Yadayim is the dual form for hands.')
    ],
    36
  ),
  lesson(
    23, 5,
    'Imperfect Tense',
    'Read the imperfect tense and understand its basic future or incomplete sense.',
    `Lesson 23 introduces the imperfect tense. The learner sees that imperfect forms often express incomplete, ongoing, or future action depending on context. This lesson is a bridge into more advanced reading.`,
    [
      v('יִכְתֹּב', 'yikhtov', 'he will write', 'A common imperfect form.'),
      v('תִּלְמַד', 'tilmad', 'you will learn', 'A second-person imperfect form.'),
      v('נֵלֵךְ', 'nelekh', 'we will go', 'A first-person plural imperfect form.')
    ],
    [
      mc('What does the imperfect often express?', ['Incomplete or future action', 'Only past action', 'Only nouns', 'Only adjectives'], 'Incomplete or future action', 'Context determines the exact sense.'),
      tr('What does יִכְתֹּב mean?', ['he will write', 'he wrote', 'he is king', 'he is good'], 'he will write', 'Yikhtov is the imperfect form of write.')
    ],
    38
  ),
  lesson(
    24, 5,
    'Vocabulary Review',
    'Review the most important vocabulary from the whole course and finish with confidence.',
    `Lesson 24 closes the course with a vocabulary review. The learner revisits the most common biblical words from the entire sequence and checks whether the forms are familiar enough to support continued reading and future expansion.`,
    [
      v('שָׁלוֹם', 'shalom', 'peace', 'A high-frequency biblical word.'),
      v('חֶסֶד', 'chesed', 'steadfast love / kindness', 'An important theological term.'),
      v('תוֹרָה', 'torah', 'instruction / law', 'A central Hebrew noun.')
    ],
    [
      mc('What does תוֹרָה mean?', ['instruction / law', 'peace', 'king', 'house'], 'instruction / law', 'Torah is a key biblical term.'),
      tr('What does שָׁלוֹם mean?', ['peace', 'root', 'from', 'two'], 'peace', 'Shalom is one of the most familiar Hebrew words.'),
      mc('Which word means steadfast love / kindness?', ['חֶסֶד', 'אֲשֶׁר', 'לֹא', 'בְּ'], 'חֶסֶד', 'Chesed is an important biblical word.')
    ],
    42
  )
].map((l) => [l.id, l]));

window.HEBREW_LESSON_DATA = HEBREW_LESSON_DATA;
window.HEBREW_WORLD_STRUCTURE = [
  { id: 1, lessons: [1, 2, 3, 4, 5], requiredWorld: null, name: 'Reading Foundations' },
  { id: 2, lessons: [6, 7, 8, 9, 10], requiredWorld: 1, name: 'Core Grammar' },
  { id: 3, lessons: [11, 12, 13, 14, 15], requiredWorld: 2, name: 'Verbs and Agreement' },
  { id: 4, lessons: [16, 17, 18, 19, 20], requiredWorld: 3, name: 'Syntax and Particles' },
  { id: 5, lessons: [21, 22, 23, 24], requiredWorld: 4, name: 'Review and Mastery' }
];
