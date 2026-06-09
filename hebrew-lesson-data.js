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
    'Welcome to Hebrew: The Semitic Language Family',
    'Discover what makes Hebrew unique and why it belongs to the Semitic language family.',
    `
WHAT ARE THE SEMITIC LANGUAGES?

Imagine a large family tree with many branches. Just like a real family shares certain traits — maybe red hair, a nose shape, or a talent for music — languages also belong to families and share important features.

Hebrew is part of a language family called the SEMITIC LANGUAGES. The name comes from Shem (שֵׁם in Hebrew), one of Noah's sons in the Bible. Ancient people groups descended from Shem spoke languages that all shared similar patterns and structures.

SEMITIC LANGUAGES AROUND THE WORLD

The Semitic family includes:
• HEBREW — spoken in ancient Israel and Judah; still used today in religious study and modern Israel
• ARAMAIC — spoken across the Middle East; became very common after Hebrew; parts of the Bible are in Aramaic
• ARABIC — spoken today by hundreds of millions of people from North Africa to the Middle East
• AKKADIAN — one of the oldest languages ever written; used in ancient Mesopotamia (Iraq today)
• PHOENICIAN — spoken by ancient seafaring traders
• AMHARIC — spoken in Ethiopia today

All these languages are cousins. They share similar sounds, grammar patterns, and ways of building words.

WHAT MAKES SEMITIC LANGUAGES SPECIAL?

Semitic languages are built differently than English. In English, we might say "I walked to the store." But in Hebrew, the language is built on ROOTS — special combinations of consonants (usually 3 letters) that carry the core meaning.

For example, the Hebrew root שׁ-ל-ח (sh-l-kh) means "send." From this one root, we get:
• שָׁלַח (shalakh) = "he sent"
• שְׁלִיחַ (shliakh) = "messenger" (one who is sent)
• מִשְׁלַח (mishlakh) = "sending" or "mission"

It's like a MAGIC COMBINATION that changes meaning by adding letters before, after, or in the middle!

WHERE DID HEBREW COME FROM?

Hebrew developed in ancient Canaan (modern-day Israel and Palestine) around 3,000 years ago. It was the language of:
• The ancient kingdoms of Israel and Judah
• The Hebrew Bible (what Christians call the Old Testament)
• Daily life in cities like Jerusalem, Bethlehem, and Nazareth

Over time, Hebrew was influenced by other languages (Aramaic, Greek, Persian) and then became less common as a spoken language. But it never died! Jewish scholars kept Hebrew alive through study and prayer for nearly 2,000 years. In the 1800s and 1900s, Hebrew was brought back as a living language and is spoken in Israel today.

WHY STUDY HEBREW?

• HISTORY: Read ancient texts directly instead of translations
• CULTURE: Understand Jewish and Christian heritage
• BRAIN POWER: Learning an ancient language strengthens your thinking skills
• ADVENTURE: Unlock a completely different way of seeing the world

KEY CHARACTERISTIC: THE THREE-LETTER ROOT (שׁוֹרֶשׁ — shoresh)

Almost every Hebrew word grows from a root. It's like Hebrew is a super-efficient language that recycles three-letter combinations to create hundreds of related words. This makes Hebrew logical and beautiful at the same time.

Ready to learn this amazing language? Let's begin!
    `,
    [
      v('שֵׁם', 'shem', 'name', 'Semitic languages are named after Shem, son of Noah.'),
      v('שֹׁרֶשׁ', 'shoresh', 'root', 'Hebrew words are built from three-letter roots that carry meaning.'),
      v('לָשׁוֹן', 'lashon', 'language / tongue', 'Hebrew is the ancient language of Israel and Judah.'),
      v('קָנַעַן', 'kanaan', 'Canaan', 'The ancient land where Hebrew developed.'),
      v('סֵמִי', 'semi', 'Semitic', 'Belonging to the Semitic language family.')
    ],
    [
      mc('Which language family includes Hebrew?', ['Semitic', 'Romance', 'Slavic', 'Germanic'], 'Semitic', 'Hebrew is one of the Semitic languages, named after Shem.'),
      mc('What does a three-letter ROOT help us do?', ['Write poetry', 'Build related words from one meaning', 'Speak faster', 'Memorize alphabets'], 'Build related words from one meaning', 'Roots are the foundation of Hebrew vocabulary.'),
      tr('What does שֹׁרֶשׁ mean?', ['root', 'house', 'king', 'letter'], 'root', 'Root-based vocabulary is central to Hebrew. This is the key to unlocking Hebrew!'),
      mc('Where did Hebrew come from?', ['Ancient Rome', 'Ancient Canaan (Israel)', 'Ancient Greece', 'Ancient Egypt'], 'Ancient Canaan (Israel)', 'Hebrew developed in the land we now call Israel and Palestine.')
    ],
    20
  ),
  lesson(
    2, 1,
    'The Hebrew Alphabet — Meet All 22 Letters',
    'Learn the 22 consonant letters of Hebrew and understand which letters have special final forms.',
    `
THE HEBREW ALPHABET: A COMPLETE GUIDE

Did you know? Hebrew has 22 letters, not 26 like English. These are all CONSONANTS — the language doesn't write regular vowels in ancient texts (though later scribes added vowel marks to help readers).

Think of Hebrew letters like building blocks. Each letter has:
• A NAME (like "Aleph," "Bet," "Gimel")
• A SOUND it represents
• A FORM when it stands alone
• An APPEARANCE when it connects to other letters

THE 22 LETTERS (in order):

Aleph (א) — Silent; a glottal stop like the break between "oh-oh" in "oh-oh!"
Bet (ב) or Vet (ב) — B or V sound, depending on if there's a DOT (dagesh)
Gimel (ג) — G sound like in "get"
Dalet (ד) — D sound
He (ה) — H sound, often silent at the end of words
Vav (ו) — V or W sound; also used as a vowel helper
Zayin (ז) — Z sound
Khet (ח) — Guttural KH sound, deep in the throat (very Hebrew!)
Tet (ט) — T sound (emphatic)
Yod (י) — Y sound like in "yes"
Kaf (כ) or Khaf (כ) — K or KH sound with dagesh
Lamed (ל) — L sound
Mem (מ) — M sound
Nun (נ) — N sound
Samekh (ס) — S sound
Ayin (ע) — Guttural sound, almost like a throat scratch (unique to Semitic!)
Pe (פ) or Fe (פ) — P or F sound with dagesh
Tsade (ץ) — TS sound
Qof (ק) — Q sound (hard K in the throat)
Resh (ר) — R sound
Shin (ש) with dot — SH sound
Sin (שׂ) with different dot — S sound
Tav (ת) — T sound (soft sound at end of words)

FIVE LETTERS WITH SECRET FORMS!

In Hebrew, five letters have SPECIAL FORMS when they appear at the END of a word:
• Kaf becomes ך (final kaf)
• Mem becomes ם (final mem)
• Nun becomes ן (final nun)
• Pe becomes ף (final pe)
• Tsade becomes ץ (final tsade)

It's like these letters put on special "end-of-word" costumes! When you see these forms, you know immediately that you're at the end of a word.

THE DAGESH: A HIDDEN POWER

Some letters have a small DOT inside them called a DAGESH. This dot changes how the letter sounds:
• בּ (bet with dagesh) = "B" sound
• ב (vet without dagesh) = "V" sound

Think of the dagesh as a POWER-UP that makes certain letters harder or different!

WHY LEARN THE ALPHABET FIRST?

Learning Hebrew letters is like learning the alphabet in English — it's the foundation for everything! You must know:
1. The letter names (for reference)
2. The sounds they make
3. Their regular and final forms
4. Which letters have dagesh marks

Once you master these 22 letters, you have the key to reading Hebrew texts that are thousands of years old!
    `,
    [
      v('אָלֶף', 'aleph', 'first letter; also means thousand', 'The first letter of the alphabet.'),
      v('בֵּית', 'beit', 'house; also the name of the letter Bet', 'Second letter; its name means "house" because its shape looks like a simple house from above.'),
      v('סוֹף אוֹת', 'sof ot', 'final letter form', 'When certain letters appear at the end of a word, they change shape.'),
      v('דָּגֵשׁ', 'dagesh', 'dot inside a letter; makes it sound different', 'A small dot that changes how a letter is pronounced.'),
      v('תָּוִים', 'tavim', 'letters', 'The plural form of "tav" (letter).')
    ],
    [
      mc('How many letters does the Hebrew alphabet have?', ['22', '24', '26', '28'], '22', 'Hebrew has 22 consonant letters.'),
      mc('What is a DAGESH?', ['A vowel mark', 'A small dot that changes a letter\'s sound', 'A final letter form', 'A paragraph mark'], 'A small dot that changes a letter\'s sound', 'The dagesh is a power-up that changes pronunciation!'),
      tr('Which letters have FINAL FORMS?', ['All of them', 'Five special letters', 'Only vowels', 'Only consonants'], 'Five special letters', 'Kaf, Mem, Nun, Pe, and Tsade have special end-of-word forms.'),
      mc('The letter aleph sounds like:', ['Ah', 'A glottal stop (silent break)', 'El', 'Al'], 'A glottal stop (silent break)', 'Aleph is a silent consonant—like the break in "oh-oh!"')
    ],
    20
  ),
  lesson(
    3, 1,
    'Pronunciation & Gutturals — Sounds You\'ve Never Heard',
    'Master Hebrew consonant sounds and learn about GUTTURALS—the unique throat sounds.',
    `
HEBREW PRONUNCIATION: A SONIC ADVENTURE

When you speak English, your lips, tongue, and teeth do most of the work. But Hebrew uses a special group of sounds that come from DEEP IN YOUR THROAT called GUTTURALS. These sounds are part of what makes Hebrew unique and different from English.

THE FOUR GUTTURAL CONSONANTS

Hebrew has four special letters that sound like they come from your gut (stomach area). Imagine making a sound way back in your throat:

1. ALEPH (א) — Silent glottal stop
   • Sometimes you can't really hear it
   • It's like the catch in your breath between "oh-oh"
   • Often acts as a vowel helper in Hebrew

2. HE (ה) — The H sound
   • Like in "hello" or "house"
   • Can be pronounced or silent at word's end
   • Acts as a vowel marker sometimes

3. KHET (ח) — The guttural KH
   • Like the German "Bach" (the composer)
   • VERY different from the English K sound
   • Comes from deep in your throat, almost like a scratch sound
   • You make this by tightening your throat muscles

4. AYIN (ע) — The guttural catch
   • Unique to Semitic languages!
   • Sounds like a guttural break, almost a swallow
   • The closest English has is the "uh" sound made from way down
   • VERY hard for English speakers to pronounce naturally

WHY GUTTURALS MATTER

Guttural letters change how other letters are pronounced! When a guttural appears near a vowel, the vowel often changes quality:
• Before a guttural, "A" vowels are often stronger and louder
• After a guttural, vowels can shift

Example: The word for "father" (אָב — ab) with ALEPH at the start sounds different from most Hebrew words because of the guttural opening.

DISTINGUISHING SIMILAR LETTERS

Hebrew has letter pairs that sound similar but are NOT the same. Beginners must learn to hear the difference:

TRICKIER PAIRS TO WATCH FOR:
• בּ (Bet — B sound) vs. פּ (Pe — P sound) — Only the lips move differently
• ד (Dalet — D sound) vs. ט (Tet — T sound) — Tet is more emphatic
• ש (Shin — SH sound) vs. שׂ (Sin — S sound) — Same letter, different dot placement
• ס (Samekh — S sound) vs. ש (Shin — SH sound) — Both are S sounds but Shin has a dot

LEARNING PRONUNCIATION TIPS

1. LISTEN CAREFULLY to recordings of native Hebrew speakers
2. REPEAT OUT LOUD — Don't just read silently
3. PRACTICE GUTTURALS — Get your throat involved! Make that KH sound and get used to it
4. GROUP BY SOUND — Memorize which letters make similar sounds
5. RECORD YOURSELF — Listen back to see if you sound like the authentic pronunciations

EMPHASIS AND EMPHATICITY

Hebrew has EMPHATIC consonants (like the Tet) that are pronounced with more force than regular consonants. These sound heavier and more powerful. Imagine the difference between saying "TUH" (regular) vs. "TTUH" (emphatic with more throat power).

KEY TAKEAWAY:

Hebrew pronunciation seems strange at first because of the gutturals, but it's beautiful once you train your ear and throat to produce these sounds. The more you practice, the more natural it becomes. Many beginners avoid gutturals at first—DON'T! Embrace them. They're the heart of Hebrew's unique sound.
    `,
    [
      v('ח', 'khet', 'guttural KH sound, deep in throat', 'Like German "Bach"—a sound from deep in the throat.'),
      v('ע', 'ayin', 'guttural glottal catch', 'Unique Semitic sound; almost like a swallow sound.'),
      v('א', 'aleph', 'silent glottal stop', 'Often silent or acts as a vowel helper.'),
      v('ה', 'he', 'H sound or silent', 'Often silent at the end of words.'),
      v('גַּרוֹן', 'garon', 'throat; root for "guttural"', 'Gutturals are literally "throat sounds".')
    ],
    [
      mc('How many GUTTURAL consonants does Hebrew have?', ['2', '3', '4', '5'], '4', 'Aleph, He, Khet, and Ayin are the four guttural consonants.'),
      tr('What does KHET sound like?', ['Like K in "king"', 'Like the German composer "Bach"', 'Like S in "sun"', 'Like T in "time"'], 'Like the German composer "Bach"', 'Khet is pronounced from deep in the throat.'),
      mc('Which letter is UNIQUE to Semitic languages?', ['Aleph', 'Khet', 'Ayin', 'He'], 'Ayin', 'Ayin\'s guttural catch sound is found in very few languages.'),
      tr('Why do GUTTURALS matter in Hebrew?', ['They are prettier', 'They change how nearby vowels sound', 'They help with memorization', 'They don\'t really matter'], 'They change how nearby vowels sound', 'Gutturals influence the pronunciation of surrounding letters.')
    ],
    22
  ),
  lesson(
    4, 1,
    'How Hebrew Writing Evolved — From Ancient Stones to Modern Print',
    'Trace the history of Hebrew script from Phoenician to today\'s square script.',
    `
A JOURNEY THROUGH TIME: HOW HEBREW WRITING CHANGED

Imagine you wrote a letter to your friend, then 1,000 years later, someone tried to read it. They might not recognize your handwriting! The same thing happened to Hebrew—the writing system changed dramatically over 3,000 years.

THE THREE MAJOR SCRIPTS OF HEBREW

1. PALEO-HEBREW (OLD HEBREW) — 1000–200 BCE
   • The OLDEST form of Hebrew writing
   • Used by ancient Israelites on stone inscriptions and pottery
   • Each letter was simple and looked more like a picture
   • Example: The letter for "ox head" (aleph) actually looked like an ox head!
   • Found on famous artifacts like the Moabite Stone

2. ARAMAIC INFLUENCE SCRIPT — 200 BCE–500 CE
   • As Aramaic became more common in the Middle East, its writing style influenced Hebrew
   • Letters became more angular and connected
   • The square shape began to develop
   • Scribes started combining letters to write faster

3. SQUARE SCRIPT (כְּתָב מְרֻבָּע — Ketav Meruba) — 500 CE to TODAY
   • The form we use for PRINTED Hebrew today
   • Developed during and after the Second Temple period (after Babylonian exile)
   • Letters are more geometric and angular
   • Used in all modern Hebrew books, Torah scrolls, and printed materials
   • Standardized shape makes it easy to read

THE PHOENICIAN CONNECTION

Here's something mind-blowing: Hebrew letters descended from Phoenician letters! The Phoenicians were ancient traders who developed one of the first ALPHABETS (instead of hieroglyphics or cuneiform).

The Phoenicians' brilliant idea: One simple picture = one sound. For example:
• An ox head picture (aleph) = "A" sound
• A house picture (bet) = "B" sound
• A camel picture (gimel) = "G" sound

Hebrew borrowed this idea and adapted it. So:
PHOENICIAN → HEBREW SCRIPT EVOLUTION

Example - The Letter Aleph:
• Phoenician: 🐂 (looked like an ox head)
• Paleo-Hebrew: א (simplified the ox head)
• Modern Square Script: א (now a geometric shape)

WHY THE SHAPE CHANGED

Imagine if you had to write the same letter 1,000 times a day (scribes did!). You'd simplify it too! Here's what happened:
1. SPEED — Scribes needed to write faster, so curves became angles
2. QUILL PENS — Using reed pens made thick and thin strokes natural, so the script developed thick and thin lines
3. STONE TO PAPER — Moving from carving in stone to writing on papyrus/parchment changed how letters looked
4. STANDARDIZATION — The Jewish tradition required standard letter forms, especially for Torah scrolls

THE MODERN SQUARE SCRIPT (WHAT YOU'LL LEARN)

Today's Hebrew alphabet is called "square script" (Ketav Meruba) because:
• Letters are angular, not curved
• Each letter fits into an imaginary square box
• Letters are clearly separated (not connected like cursive English)
• It's uniform and easy to print mechanically

This is the script that appears in:
✓ Torah scrolls in synagogues
✓ Ancient Dead Sea Scrolls (from 2,000 years ago!)
✓ Modern Hebrew newspapers and books
✓ Israeli street signs and documents

CURSIVE HEBREW (FOR HANDWRITING)

When Israelis write by hand, they use CURSIVE forms that look different from print! But you don't need to worry about this yet—learn square script first, then cursive later. They're basically the same letters, just flowing together.

WHY THIS HISTORY MATTERS

When you learn Hebrew today, you're learning the 2,500-year-old square script that goes all the way back to ancient Phoenician merchants! Understanding this history helps you appreciate:
1. Why letters look the way they do
2. Why letter names describe their original shapes (aleph = ox, bet = house)
3. How connected all ancient languages are
4. The incredible persistence of written Hebrew through empires, exiles, and centuries

You're not just learning an alphabet—you're holding a piece of human history in your hands!
    `,
    [
      v('כְּתָב קָדוּם', 'ketav qadum', 'ancient/old script', 'The oldest form of Hebrew writing, used before exile.'),
      v('כְּתָב מְרֻבָּע', 'ketav meruba', 'square script', 'Modern Hebrew\'s geometric, angular script used today.'),
      v('פְּנִיקִי', 'pheniki', 'Phoenician', 'The ancient alphabet that influenced Hebrew.'),
      v('סֵפֶר תּוֹרָה', 'sefer torah', 'Torah scroll', 'Sacred Torah written in square script by hand.'),
      v('אוֹת', 'ot', 'letter / sign', 'Single letter of the alphabet (plural: otiyot).')
    ],
    [
      mc('Which script is the OLDEST form of Hebrew writing?', ['Paleo-Hebrew', 'Square Script', 'Aramaic', 'Phoenician'], 'Paleo-Hebrew', 'Paleo-Hebrew was used by ancient Israelites.'),
      mc('What influenced Hebrew script to become angular and square?', ['Roman conquest', 'Aramaic influence', 'Greek traders', 'Christian scribes'], 'Aramaic influence', 'Aramaic became widespread after the Babylonian exile.'),
      tr('What does קָדוּם mean?', ['modern', 'sacred', 'ancient / old', 'written'], 'ancient / old', 'Ketav qadum = "ancient script"'),
      mc('Why did the square script develop?', ['It looked prettier', 'Scribes needed to write faster and used quill pens', 'The king demanded it', 'Phoenicians invented it'], 'Scribes needed to write faster and used quill pens', 'Speed and pen technology drove the evolution of letter shapes.')
    ],
    22
  ),
  lesson(
    5, 1,
    'The Vowel System — How Hebrew Breaths and Flows',
    'Master Hebrew\'s vowel marks and learn how the Sheva creates the heartbeat of the language.',
    `
HEBREW\'S VOWEL MYSTERY

Here's something shocking: Ancient Hebrew didn't WRITE vowels. At all.

Imagine reading English like this: "Hll wrld! Hw r yu?" (Hello world! How are you?)

For 1,000 years, Hebrew readers had to know vowels from MEMORY or CONTEXT. Then, between the 6th and 10th centuries, Jewish scholars invented a system of VOWEL MARKS (called NIKUD — "dots and dashes") to help readers who didn't know the language fluently.

THE SEVEN HEBREW VOWELS

Hebrew's vowel system is simpler than English (which has many ways to spell "a" sounds). Hebrew has SEVEN basic vowels, each with a specific mark:

1. PATACH (ַ) — Short "A" sound
   Example: קַט (kat) = "short"
   Looks like: A horizontal line under the letter
   How to remember: The opening is WIDE (like the letter A), so vowel is open too

2. SHEVA (ְ) — Very short, almost silent
   Example: דְבַר (d'var) = "word"
   Looks like: Two dots under the letter
   How to remember: SHEVA literally means "seven" — represents emptiness/shortness

3. HIRIQ (ִ) — Short "I" sound
   Example: קִיץ (kitz) = "summer"
   Looks like: One dot under the letter
   How to remember: Smallest mark = shortest sound

4. QAMATS (ָ) — Long "AH" sound
   Example: בָּר (bar) = "clean"
   Looks like: A small T shape under the letter
   How to remember: Larger mark = longer sound

5. TSER-E (ֵ) — Short "E" sound
   Example: עֵץ (etz) = "tree"
   Looks like: Two small horizontal lines under the letter
   How to remember: Two marks = medium sound

6. TSURE (ּ) — Long "OO" sound
   Example: דּוּר (dur) = "to dwell"
   Looks like: A small circle under the letter
   How to remember: Circle is round, like "oo"

7. CHOLEM (ֹ) — Long "O" sound
   Example: דּוֹם (dom) = "silence"
   Looks like: A dot OVER the letter (usually on the right)
   How to remember: Only vowel mark that goes ABOVE the line

VOWEL MARK COMBINATIONS THAT CONFUSE BEGINNERS:

• QAMATS vs. PATACH — One is long "AH," the other is short "A"
• TSER-E vs. HIRIQ — Both short, but E vs. I
• TSURE vs. CHOLEM — Both long, but "OO" vs. "O"

Listen carefully to audio to hear the difference!

THE MAGICAL SHEVA — HEBREW\'S HEARTBEAT

The SHEVA is the most important vowel to understand because:

1. SILENT SHEVA (שווא נח — sheva nakh)
   • Appears under a letter at the END of a word or before another consonant
   • Pronounced almost as silence (like the final "e" in English "hope")
   • Marks where pronunciation stops or pauses

   Example: דְבַר (d'var)
   The sheva under the dalet (ד) is SILENT — you don't really hear it
   Pronunciation: "d'VER" (not "duh-VAR")

2. MOBILE SHEVA (שווא נע — sheva na)
   • Appears at the BEGINNING of a word or between two consonants when the first is hard
   • Pronounced as a tiny "uh" sound (like the "a" in "sofa" or the "u" in "supply")
   • Creates a tiny syllable

   Example: שְׁמַע (sh'ma)
   The sheva under the shin (שׁ) is pronounced as a tiny "uh"
   Pronunciation: "shuh-MAH" — the sheva gives it a syllable

HOW TO HEAR THE SHEVA

Listen to these words:
• דְבַר (d'var — word): Silent sheva, crisp consonant connection
• שְׁמַע (sh'ma — hear): Mobile sheva, creates a tiny vowel sound

The difference is SUBTLE but REAL. Native speakers hear it naturally.

VOWELS AND GEMINATION (DOUBLED LETTERS)

Sometimes a vowel mark sits UNDER a doubled letter (with a DAG ESH). The vowel belongs UNDER the consonant, not between them.

Example: פַּ (pa) — Not "puh-ah" but just "PAH" with doubled P

THE ROLE OF VAV (ו) AND YOD (י) AS VOWEL HELPERS

In ancient texts without vowel marks, certain consonants acted as vowel helpers:
• VAV (ו) often represented the "O" or "U" sound
• YOD (י) often represented the "I" or "E" sound

This is why you see them in modern pointed texts — they're spelling out what was always there!

VOWEL PATTERNS SIGNAL GRAMMAR

Different vowel patterns signal different word types:
• קָטֹל (qatol) pattern usually = a verb
• קֻטַל (qutal) pattern usually = a different verb form
• קִטּוּל (qittul) pattern usually = a noun

Learning vowel patterns is like learning to recognize word families in English!

PRACTICE TIPS FOR MASTERING VOWELS

1. POINT OUT loud — Say the vowel marks as you read
2. LISTEN while reading — Use audio to hear native pronunciation
3. NOTICE PATTERNS — See how the same root takes different vowels
4. COMPARE pairs — שִׁמּוּ (shimmu) vs. שָׁמוּ (shamu) vs. שְׁמוּ (sh'mu) — All different!
5. READ WITHOUT VOWELS — Once strong, challenge yourself to guess vowels in unpointed text

The vowel system seems complicated now, but with practice, your eye will naturally recognize these marks and your brain will generate the sounds automatically!
    `,
    [
      v('פַּתַח', 'patach', 'short A vowel', 'The most common vowel mark; looks like a horizontal line.'),
      v('שְׁוָא', 'sheva', 'silent or very short vowel', 'The heartbeat of Hebrew; either silent or a tiny "uh".'),
      v('קָמַץ', 'qamats', 'long AH vowel', 'Looks like a small "T" under the letter.'),
      v('נִקּוּד', 'nikud', 'vowel system / vowel marks', 'The entire system of dots and dashes marking vowels.'),
      v('צִירֵה', 'tsire', 'short E vowel', 'Looks like two horizontal lines under the letter.')
    ],
    [
      mc('How many basic vowels does Hebrew have?', ['5', '7', '9', '11'], '7', 'Hebrew has seven primary vowel marks.'),
      mc('What is the SHEVA?', ['A long vowel', 'A silent or very short vowel; the "heartbeat" of Hebrew', 'A consonant marker', 'A written accent'], 'A silent or very short vowel; the "heartbeat" of Hebrew', 'The sheva can be silent (nakh) or mobile (na).'),
      tr('What does NIKUD mean?', ['plural letters', 'vowel system / vowel marks', 'accents', 'spelling rules'], 'vowel system / vowel marks', 'Nikud is the system of vowel marks invented by medieval scholars.'),
      mc('In ANCIENT Hebrew texts (no vowels written), how did readers know vowels?', ['They guessed', 'From memory and context', 'Special scrolls told them', 'Vowels didn\'t exist'], 'From memory and context', 'Readers knew the language fluently and used context to supply vowels.')
    ],
    24
  ),
  lesson(
    6, 2,
    'Building Blocks: Gender, Conjunction, and the Definite Article',
    'Master three fundamental grammar concepts that appear in almost every Hebrew sentence.',
    `
THREE CORNERSTONE CONCEPTS

In this lesson, we jump from alphabet and vowels into GRAMMAR. Here are three concepts that appear literally in every Hebrew text. Once you understand these three, you unlock the door to reading real Hebrew:

1. GRAMMATICAL GENDER (זָכָר וּנְקֵבָה — Zakar u'Nekevah)
2. THE CONJUNCTION VAV (וְ — ve)
3. THE DEFINITE ARTICLE (הַ — ha-)

CONCEPT 1: GRAMMATICAL GENDER — EVERYTHING IS MALE OR FEMALE

In English, we barely think about gender. A pencil is just "it." But in Hebrew, EVERY NOUN is either MASCULINE or FEMININE.

Imagine: If you're describing a king (male noun), everything that describes the king must also be "male" (masculine adjectives, verbs, etc.). If you describe a queen (female noun), everything becomes "female" (feminine adjectives, verbs, etc.).

MASCULINE vs. FEMININE CLUES:

Masculine nouns typically END with:
• Nothing (bare) — מֶלֶךְ (melekh — king)
• The letter ך or כ — סֵפֶר (sefer — book)

Feminine nouns typically END with:
• ה — מַלְכָּה (malka — queen)
• ת — דַּבֶּרֶת (dabberet — speaking woman)

WHY GENDER MATTERS:
When you describe a noun, the adjective, article, and verb ALL must match:
• "A great king" = מֶלֶךְ גָּדוֹל (melekh gadol) — masculine adjective
• "A great queen" = מַלְכָּה גְּדוֹלָה (malka gedolah) — feminine adjective

If you get the gender wrong, it's like saying "a big she-king" or "a small he-queen" — grammatically broken!

CONCEPT 2: THE CONJUNCTION VAV (וְ — "and")

The letter VAV (ו) when it has a vowel becomes a CONJUNCTION meaning "and". It's super common—probably the most frequent word in the entire Hebrew Bible!

The MAGIC of VAV: It ATTACHES to the beginning of the next word. You don't write "and the king" separately. Instead:

"and" + "the" + "king" = וְהַמֶּלֶךְ (veha-melekh)

The vowel under the vav changes depending on what follows:
• וְ (ve-) — before most consonants = "and"
• וַ (va-) — before sheva = "and" (different vowel)

CONCEPT 3: THE DEFINITE ARTICLE (הַ — "the")

In English, we have "a cat" (indefinite) and "the cat" (definite). Hebrew does the same with a prefix:

הַ (ha-) = "the"

Attaches directly to nouns:
• מֶלֶךְ (melekh) = "a king"
• הַמֶּלֶךְ (ha-melekh) = "the king"

IMPORTANT RULES:
1. The article makes the noun specific and definite
2. The article changes the vowel pattern
3. Adjectives describing a definite noun ALSO need the article

HOW THESE THREE WORK TOGETHER:

Example: "The great king"
• King (noun, masculine) = מֶלֶךְ
• Great (adjective, must be masculine) = גָּדוֹל
• Now make it definite (add "the"):
   Putting it together: הַמֶּלֶךְ הַגָּדוֹל
   (ha-melekh ha-gadol)

Notice all words have the article "ha-" because the king is definite/specific!
    `,
    [
      v('זָכָר', 'zakhar', 'masculine', 'Male gender in grammar (literally "male").'),
      v('נְקֵבָה', 'nekevah', 'feminine', 'Female gender in grammar (literally "female").'),
      v('הַ', 'ha-', 'the (definite article)', 'Prefix that makes a noun specific and definite.'),
      v('וְ', 've-', 'and (conjunction)', 'The letter vav as a connector word meaning "and".'),
      v('הַמֶּלֶךְ', 'ha-melekh', 'the king (masculine + definite)', 'Example of masculine noun with the article.')
    ],
    [
      mc('In Hebrew, how many genders do nouns have?', ['1', '2', '3', '4'], '2', 'Hebrew nouns are either masculine or feminine.'),
      mc('What does the prefix הַ mean?', ['and', 'the', 'not', 'from'], 'the', 'Ha- is the definite article meaning "the".'),
      tr('What does וְ mean?', ['and', 'to', 'the', 'not'], 'and', 'Ve- is the conjunction "and" attached to the following word.'),
      mc('If a noun is feminine, what must also be feminine?', ['Verbs only', 'Adjectives describing it', 'All words nearby', 'Nothing—gender doesn\'t matter'], 'Adjectives describing it', 'Adjectives must match the gender of the noun they describe.')
    ],
    24
  ),
  lesson(
    7, 2,
    'Adjectives — Making Perfect Descriptions',
    'Learn how adjectives change to match the nouns they describe in gender.',
    `
THE AGREEMENT PRINCIPLE

In English, adjectives NEVER change:
• "big boy" and "big girl" both use "big"

In Hebrew, adjectives CHANGE based on the noun's gender and definiteness:
• בַּחוּר גָּדוֹל (bachur gadol) = "big boy" (masculine, indefinite)
• בַּחוּרָה גְּדוֹלָה (bachurah gedolah) = "big girl" (feminine, indefinite)
• הַבַּחוּר הַגָּדוֹל (ha-bachur ha-gadol) = "the big boy" (masculine, definite)
• הַבַּחוּרָה הַגְּדוֹלָה (ha-bachurah ha-gedolah) = "the big girl" (feminine, definite)

Notice how GADOL transforms:
• גָּדוֹל (masculine, indefinite)
• גְּדוֹלָה (feminine, indefinite — added ה)
• הַגָּדוֹל (masculine, definite — article added)
• הַגְּדוֹלָה (feminine, definite — article + ה)

ADJECTIVE POSITION

In English: adjective comes BEFORE the noun
• "big house"

In Hebrew: adjective comes AFTER the noun
• בַּיִת גָּדוֹל (bayit gadol) = "house big" (means "big house")

This feels backward at first, but you'll get used to it!

RULES FOR ADJECTIVE AGREEMENT

When an adjective describes a noun, it must match:
1. GENDER — If noun is feminine, adjective is feminine
2. DEFINITENESS — If noun has "the", adjective needs "the" too
3. NUMBER — If noun is plural, adjective is plural

COMMON ADJECTIVES YOU'LL NEED

• גָּדוֹל / גְּדוֹלָה = big / great
• קָטוֹן / קְטַנָּה = small
• טוֹב / טוֹבָה = good
• רַע / רָעָה = bad / evil
• יָפֶה / יָפָה = beautiful
• חָכָם / חָכָמָה = wise
• חִזֵּק / חִזְקָה = strong

REAL HEBREW PHRASES

"The wise king":
• King (masculine, needs "the") = הַמֶּלֶךְ
• Wise (must be masculine + "the") = הַחָכָם
• Together: הַמֶּלֶךְ הַחָכָם

"A good book":
• Book (masculine, indefinite) = סֵפֶר
• Good (masculine, indefinite) = טוֹב
• Together: סֵפֶר טוֹב

KEY TAKEAWAY:

Adjectives in Hebrew are ALIVE—they change and dance with their nouns to match gender and definiteness. This flexibility makes Hebrew incredibly expressive!
    `,
    [
      v('גָּדוֹל', 'gadol', 'big / great (masculine)', 'Common adjective; changes form for feminine.'),
      v('גְּדוֹלָה', 'gedolah', 'big / great (feminine)', 'Feminine form of gadol.'),
      v('יָפֶה', 'yafe', 'beautiful (masculine)', 'Adjective; literally means "beautiful".'),
      v('יָפָה', 'yafa', 'beautiful (feminine)', 'Feminine form of yafe.'),
      v('הַגָּדוֹל', 'ha-gadol', 'the big one (masculine definite)', 'Adjective with definite article.')
    ],
    [
      mc('In Hebrew, where does the adjective go?', ['Before the noun', 'After the noun', 'Can go either way', 'At the end of the sentence'], 'After the noun', 'Hebrew adjectives follow the noun they describe.'),
      mc('If a noun is feminine, the adjective must be:', ['Masculine too', 'Feminine', 'Neuter', 'Plural'], 'Feminine', 'Adjectives match the gender of their nouns.'),
      tr('What does יָפָה mean?', ['small', 'good', 'beautiful', 'strong'], 'beautiful', 'Yafa is the feminine form of "beautiful".'),
      mc('In "the big house," which words need "the"?', ['Only the house', 'Only the big', 'Both the house and the big', 'Neither'], 'Both the house and the big', 'Both the noun and adjective need the article when definite.')
    ],
    24
  ),
  lesson(
    8, 2,
    'Checkpoint: Before We Learn Verbs',
    'Review lessons 1-7 and ensure your foundation is absolutely solid.',
    `
SOLID FOUNDATION REQUIRED

Before we jump into VERBS—the most complex part of Hebrew—we need to make absolutely sure you understand the basics. This checkpoint reviews everything and prepares you for what's coming.

ALPHABET MASTERY CHECK:
✓ Can you identify all 22 letters instantly?
✓ Can you pronounce the gutturals correctly?
✓ Do you know which 5 letters have final forms?
✓ Can you spot and understand the dagesh?

VOWEL SYSTEM MASTERY CHECK:
✓ Can you identify all 7 vowel marks?
✓ Do you understand SILENT sheva vs. MOBILE sheva?
✓ Can you hear and produce each vowel sound?
✓ Do you see how vowel patterns signal word types?

GRAMMAR MASTERY CHECK:
✓ Do you automatically know a noun's gender?
✓ Can you use the definite article הַ confidently?
✓ Do you understand how וְ (and) works?
✓ Can you make adjectives agree perfectly with nouns?

THREE SELF-TEST QUESTIONS:

1. GENDER AGREEMENT TEST:
   If I want to say "beautiful king," what form is the adjective?
   ✓ Correct: מֶלֶךְ יָפֶה (masculine, indefinite)
   
   Now say "the beautiful king":
   ✓ Correct: הַמֶּלֶךְ הַיָּפֶה (both get the article)

2. GUTTURAL RECOGNITION:
   Which of these is guttural? א, ב, ח, ד
   ✓ Correct: Both א and ח are guttural letters

3. SHEVA COMPARISON:
   What's the difference between these two words?
   • דְבַר (d'var) = sheva is SILENT (nakh)
   • שְׁמַע (sh'ma) = sheva is MOBILE (na)
   ✓ The difference is subtle but REAL!

WHY THIS CHECKPOINT MATTERS:

Hebrew VERBS are incredibly complex. They:
• Change for who's doing the action (I, you, he, she, we, they)
• Change for tense (past, present, future)
• Change gender to match the subject
• Change based on action type (complete vs. ongoing)

WITHOUT a rock-solid foundation, verbs will feel completely impossible. But WITH this foundation, everything will click into place!

REAL-WORLD EXAMPLE:

Think of learning Hebrew like building a house:
• Lessons 1-5 = Foundation and walls (alphabet + vowels)
• Lessons 6-7 = Roof framework (gender, articles, adjectives)
• Lesson 8 = Inspection before moving in (you are here!)
• Lessons 9+ = Furnishing the house (verbs and complex grammar)

You can't furnish a house if the foundation is weak. Take time now to practice and be confident!
    `,
    [
      v('שֹׁרֶשׁ', 'shoresh', 'root (foundation concept)', 'Roots are the foundation of Hebrew—alphabet through verbs.'),
      v('הִשְׁתַּדְּלוּ', 'hishtadlu', 'do your best / try hard', 'A real Hebrew word perfect for this lesson!'),
      v('בִּיטַחוֹן', 'bitakhon', 'confidence / trust', 'Build confidence in what you\'ve learned so far.'),
      v('יְסוֹדוֹת', 'yesodot', 'foundations (plural)', 'Plural of yesod (foundation).'),
      v('מוּכָן', 'mukhan', 'ready / prepared', 'You are now ready for verbs!')
    ],
    [
      mc('Which is NOT one of the foundation concepts?', ['Gender', 'Adjective agreement', 'Prepositions', 'Definite article'], 'Prepositions', 'We haven\'t studied prepositions yet!'),
      mc('If a noun is definite, what else must be definite?', ['Only the adjective', 'Both article and adjective', 'Nothing else', 'Only the next word'], 'Both article and adjective', 'All words in the phrase must agree.'),
      tr('What does הִשְׁתַּדְּלוּ mean?', ['verbs', 'do your best / try hard', 'letters', 'sounds'], 'do your best / try hard', 'This word means "do your best" or "try hard".'),
      mc('Before learning verbs, we need to be sure of:', ['All vocabulary', 'Gender, articles, and adjectives', 'Cursive writing', 'Fluent speech'], 'Gender, articles, and adjectives', 'These concepts show up everywhere in verbs!')
    ],
    24
  ),
  lesson(
    9, 2,
    'Nouns in Phrases—Building Simple Descriptions',
    'Read noun phrases combining nouns, adjectives, and plurals.',
    `
FROM SINGLE WORDS TO PHRASES

Now that you understand gender, articles, and adjectives, let's build PHRASES—combinations of words that work together.

NOUN + ADJECTIVE PATTERNS

Pattern 1: Indefinite noun + adjective (no "the")
• בַּיִת גָּדוֹל (bayit gadol) = "a big house"
• מֶלֶךְ טוֹב (melekh tov) = "a good king"
• עִיר קָדוֹשׁ (ir kadosh) = "a holy city"

Pattern 2: Definite noun + adjective (with "the")
Both words need the article!
• הַבַּיִת הַגָּדוֹל (ha-bayit ha-gadol) = "the big house"
• הַמֶּלֶךְ הַטּוֹב (ha-melekh ha-tov) = "the good king"
• הָעִיר הַקְּדוֹשָׁה (ha-ir ha-kedoshah) = "the holy city"

Notice: The definite article gets attached to BOTH words!

PLURAL PATTERNS

Hebrew plurals change in different ways depending on gender:

Masculine plurals typically add ים (im):
• מֶלֶךְ (melekh) = "king" → מְלָכִים (melakhim) = "kings"
• בַּיִת (bayit) = "house" → בָּתִּים (batim) = "houses"

Feminine plurals typically add ות (ot):
• מַלְכָּה (malka) = "queen" → מַלְכוֹת (malkhot) = "queens"
• עִיר (ir) = "city" → עָרִים (arim) = "cities" (irregular!)

PLURAL ADJECTIVES

Adjectives must also be plural to match plural nouns:
• בָּתִּים גְּדוֹלִים (batim gedolim) = "big houses" (masculine plural)
• עָרִים גְּדוֹלוֹת (arim gedolot) = "big cities" (feminine plural)
• הַמְּלָכִים הַטּוֹבִים (ha-melakhim ha-tovim) = "the good kings"

KEY PATTERNS TO PRACTICE

"A beautiful queen" = מַלְכָּה יָפָה
"The beautiful queens" = הַמַּלְכוֹת הַיָּפוֹת
"Good kings" = מְלָכִים טוֹבִים
"The good houses" = הַבָּתִּים הַטּוֹבִים

REAL BIBLICAL PHRASES

You'll see phrases like:
• "the great king" = הַמֶּלֶךְ הַגָּדוֹל
• "holy cities" = עָרִים קְדוֹשׁוֹת
• "wise men" = אַנְשִׁים חֲכָמִים

Each follows these same patterns!
    `,
    [
      v('בַּיִת', 'bayit', 'house', 'Common noun used in phrases.'),
      v('בָּתִּים', 'batim', 'houses', 'Plural of bayit.'),
      v('קָדוֹשׁ', 'kadosh', 'holy', 'Adjective meaning holy/sacred.'),
      v('קְדוֹשָׁה', 'kedoshah', 'holy (feminine)', 'Feminine form of kadosh.'),
      v('הַבַּיִת הַגָּדוֹל', 'ha-bayit ha-gadol', 'the big house', 'Example phrase with definite article.')
    ],
    [
      mc('In "the big house," how many words get "the"?', ['Just the noun', 'Just the adjective', 'Both words', 'Neither'], 'Both words', 'Both noun and adjective need the article.'),
      mc('What do masculine plurals usually end with?', ['ה', 'ים', 'ת', 'ו'], 'ים', 'Masculine plurals typically add ים.'),
      tr('What does קָדוֹשׁ mean?', ['big', 'good', 'holy', 'beautiful'], 'holy', 'Kadosh means holy or sacred.'),
      mc('If a noun is plural and feminine, the adjective must be:', ['Masculine', 'Singular', 'Feminine plural', 'Unchanged'], 'Feminine plural', 'Adjectives match noun in gender and number.')
    ],
    24
  ),
  lesson(
    10, 2,
    'Segholate Nouns & Personal Pronouns',
    'Recognize special nouns and learn how to say "he" and "she" in Hebrew.',
    `
SEGHOLATE NOUNS—A SPECIAL WORD TYPE

Some Hebrew nouns have a unique vowel pattern that looks different from what you'd expect. They're called SEGHOLATE nouns (from the Hebrew word "segol" meaning a three-dot pattern).

These nouns have a short vowel in the middle (a segol ֶ), making them sound short and snappy:

• מֶלֶךְ (melekh) = "king" → plural מְלָכִים (melakhim)
• סֵפֶר (sefer) = "book" → plural סְפָרִים (sfarim)
• קֶדֶשׁ (kedesh) = "holiness" → plural קְדָשִׁים (kdashim)
• שֶׁמֶשׁ (shemesh) = "sun" → plural שְׁמָשׁוֹת (shmashot)

Notice how segholates CHANGE their vowel when they pluralize:
• מֶ → מְ (the vowel shifts!)
• סֵ → סְ (the vowel shifts!)

Why? Because Hebrew prefers certain vowel patterns in different contexts. Segholates are following an ancient pattern that comes from thousands of years of language development.

COMMON SEGHOLATE NOUNS TO MEMORIZE:

• מֶלֶךְ = king
• סֵפֶר = book
• קֶדֶשׁ = holiness
• שֶׁמֶשׁ = sun
• עֶבֶד = servant
• קֶשׁת = bow (weapon)

PERSONAL PRONOUNS—THE "HE" AND "SHE" WORDS

Pronouns replace nouns. Instead of saying "King David is great," you can say "He is great."

Hebrew has simple personal pronouns:

THIRD PERSON (he/she/it):
• הוּא (hu) = "he" (masculine)
• הִיא (hi) = "she" (feminine)

SECOND PERSON (you):
• אַתָּה (atah) = "you" (masculine)
• אַתְּ (at) = "you" (feminine)

FIRST PERSON (I):
• אֲנִי (ani) = "I" (both genders)

These pronouns appear constantly in biblical narrative:
• הוּא זָכָר (hu zakhar) = "He is a male"
• הִיא נְקֵבָה (hi nekevah) = "She is a female"
• הוּא מֶלֶךְ (hu melekh) = "He is a king"

HEBREW SENTENCES WITHOUT "TO BE"

Here's something strange: Hebrew often OMITS the verb "to be" (is/are). Instead of saying "The king IS great," you just say "The king great":

• הַמֶּלֶךְ גָּדוֹל (ha-melekh gadol) = "The king is great" (literally "the king big")
• הִיא יָפָה (hi yafah) = "She is beautiful"
• הוּא חָכָם (hu hakham) = "He is wise"

This feels strange in English, but it's perfectly natural in Hebrew!

REAL BIBLICAL SENTENCES

"He is a good king":
• הוּא מֶלֶךְ טוֹב (hu melekh tov)

"She is beautiful":
• הִיא יָפָה (hi yafah)

"You are wise":
• אַתָּה חָכָם (atah hakham) — masculine
• אַתְּ חָכָמָה (at hakhamah) — feminine
    `,
    [
      v('מֶלֶךְ', 'melekh', 'king', 'Classic segholate noun.'),
      v('סֵפֶר', 'sefer', 'book', 'Another common segholate.'),
      v('הוּא', 'hu', 'he / it', 'Masculine third person pronoun.'),
      v('הִיא', 'hi', 'she / it', 'Feminine third person pronoun.'),
      v('אַתָּה', 'atah', 'you (masculine)', 'Second person masculine pronoun.')
    ],
    [
      mc('What vowel pattern do SEGHOLATE nouns have?', ['All long vowels', 'Segol (short) in the middle', 'No vowels at all', 'Only sheva'], 'Segol (short) in the middle', 'Segholate nouns have a distinctive short vowel pattern.'),
      mc('What does הוּא mean?', ['he / it', 'and', 'king', 'house'], 'he / it', 'Hu is the masculine third person pronoun.'),
      tr('What does סֵפֶר mean?', ['king', 'book', 'house', 'city'], 'book', 'Sefer is a common segholate noun meaning book.'),
      mc('In Hebrew, "He is great" is said:', ['With the verb "is"', 'Without the verb "is" (just two words)', 'With "and"', 'With the article'], 'Without the verb "is" (just two words)', 'Hebrew often omits the present tense of "to be".')
    ],
    24
  ),
  lesson(
    11, 3,
    'Lesson 11 — Review of Lessons 1–10',
    'Review the first half of the course with a complete survey of letters, vowels, gender, agreement and simple sentence patterns.',
    `Lesson 11 is a complete review lesson designed to bring together every building block learned so far.

You have already studied the Hebrew alphabet, the seven vowel marks, the special final forms, the definite article הַ, the conjunction וְ, adjectives that agree with nouns, and the first important pronouns. This lesson guides you through those concepts in a way that makes the next half of the course much easier.

The main goal is to do more than memorize lists: you will see how letters, roots, vowels, gender, and agreement work together in actual Hebrew phrases and short sentences. That includes reading simple definite and indefinite expressions, matching adjectives to nouns, and recognizing the pronouns that appear in real text.

After this lesson, you should be able to identify the letter names, read pointed words, and understand the structure of phrases such as הַמֶּלֶךְ גָּדוֹל and הִיא יָפָה without guessing.`,
    [
      v('שֹׁרֶשׁ', 'shoresh', 'root', 'Roots are central to Hebrew vocabulary.'),
      v('הַ', 'ha-', 'the', 'The article appears constantly in reading.'),
      v('מֶלֶךְ', 'melekh', 'king', 'A useful review noun.'),
      v('סֵפֶר', 'sefer', 'book', 'A very common masculine noun.'),
      v('זֶה', 'zeh', 'this', 'A demonstrative pronoun you already know.')
    ],
    [
      mc('Which skill belongs to the first ten lessons?', ['Reading vowels and noun agreement', 'Parsing Greek participles', 'Drawing cuneiform tablets', 'Memorizing Roman numerals'], 'Reading vowels and noun agreement', 'The first half of the course is built on reading basics.'),
      tr('What does שֹׁרֶשׁ mean?', ['root', 'king', 'great', 'daughter'], 'root', 'Root is one of the course’s key ideas.'),
      tr('What does סֵפֶר mean?', ['city', 'book', 'king', 'house'], 'book', 'Sefer is the common Hebrew word for book.'),
      mc('What does הַ mark?', ['the definite article', 'the dual number', 'a verb tense', 'a plural ending'], 'the definite article', 'Ha- marks a specific noun.')
    ],
    24
  ),
  lesson(
    12, 3,
    'Lesson 12 — Hebrew Verbs: Roots and Patterns',
    'Identify the root letters that carry verb meaning and learn how Hebrew verb forms are built from patterns.',
    `Lesson 12 begins the verb section by teaching the single most important skill for reading Hebrew verbs: identify the root letters first.

Hebrew verbs are built from a consonantal root, usually three letters. That root carries the basic meaning. The other letters and vowels around that root show tense, person, number, and sometimes voice.

This lesson explains how the same root appears in different verb forms. For example, כתב appears in כָּתַב (he wrote) and יִכְתֹּב (he will write). The root is the clue, and the pattern around it is the grammar.

Once you know how to recognize roots, Hebrew verbs become much less intimidating. You start reading them as a system instead of a collection of separate words.`,
    [
      v('כָּתַב', 'katav', 'he wrote', 'A common verb root for writing.'),
      v('לָמַד', 'lamad', 'he learned', 'A common verb root for learning.'),
      v('שָׁמַר', 'shamar', 'he kept / guarded', 'A common verb root for keeping.'),
      v('קָרָא', 'kara', 'he called / he read', 'A very frequent verb in narrative.'),
      v('נָתַן', 'natan', 'he gave', 'A basic verb of giving.')
    ],
    [
      mc('What do Hebrew verbs usually depend on?', ['Root letters and patterns', 'Case endings', 'Capital letters', 'Articles only'], 'Root letters and patterns', 'Verb meaning is tied to the root pattern.'),
      tr('What does כָּתַב mean?', ['he wrote', 'he learned', 'he went', 'he saw'], 'he wrote', 'Katav is a basic writing verb.'),
      mc('Which root appears in both "he wrote" and "he will write"?', ['כתב', 'למד', 'שמ', 'קרא'], 'כתב', 'The root כתב appears in both forms.'),
      tr('What does נָתַן mean?', ['he gave', 'he took', 'he came', 'he built'], 'he gave', 'Natan means "he gave."')
    ],
    24
  ),
  lesson(
    13, 3,
    'Lesson 13 — Present Tense and Gender Agreement',
    'Learn present tense forms and see how gender continues to control agreement in Hebrew.',
    `Lesson 13 introduces the Hebrew present tense and shows that gender is still part of every sentence.

In Hebrew, present-tense verbs change depending on whether the subject is masculine or feminine. For example, כּוֹתֵב is the masculine form and כּוֹתֶבֶת is the feminine form of "writes." This reflects the same agreement system you already used with adjectives.

The lesson also shows how adjectives change when the subject is feminine. If the subject is a queen, the adjective must also be feminine. That means the present tense is not just about verbs—it is about agreement across the phrase.

By the end of this lesson you will be able to read and understand full present-tense phrases like הוּא כּוֹתֵב and הִיא כּוֹתֶבֶת, as well as recognize that adjectives must agree with their nouns.`,
    [
      v('כּוֹתֵב', 'kotev', 'writing / he writes', 'Masculine present form.'),
      v('כּוֹתֶבֶת', 'kotevet', 'writing / she writes', 'Feminine present form.'),
      v('טוֹב', 'tov', 'good', 'Agreement continues to matter.'),
      v('טוֹבָה', 'tovah', 'good (feminine)', 'Feminine adjective form.'),
      v('יָשֵׁב', 'yashev', 'he sits / he lives', 'A common present tense verb.')
    ],
    [
      mc('Which form is feminine?', ['כּוֹתֶבֶת', 'כּוֹתֵב', 'מֶלֶךְ', 'בַּיִת'], 'כּוֹתֶבֶת', 'Kotevet is the feminine form.'),
      tr('What does כּוֹתֵב mean?', ['writing / he writes', 'house', 'king', 'and'], 'writing / he writes', 'Kotev is the masculine present form.'),
      mc('Which adjective matches a feminine subject?', ['טוֹבָה', 'טוֹב', 'סֵפֶר', 'הַמֶּלֶךְ'], 'טוֹבָה', 'Feminine adjectives must agree with feminine nouns.'),
      {
        type: 'sentence_builder',
        question: 'Arrange these words to say "she writes" in Hebrew.',
        words: ['הִיא', 'כּוֹתֶבֶת'],
        answer: ['הִיא', 'כּוֹתֶבֶת'],
        explanation: 'The subject הִיא is paired with the feminine present form כותבת.'
      }
    ],
    26
  ),
  lesson(
    14, 3,
    'Lesson 14 — Verb Patterns and Meaning',
    'Deepen your understanding of Hebrew verb stems and how meaning remains attached to the root.',
    `Lesson 14 takes the next step in Hebrew verb study. You already know the root is the heart of a verb; now you learn how different verb forms are made from that same root.

Some verbs look very different in different tenses, but the consonant root stays the same. That is the key to recognizing meaning quickly. This lesson gives more examples so you can see the root clearly even when the vowels and prefixes change.

The lesson also emphasizes that Hebrew verbs are not random: they are patterns with a system. Once you can identify the pattern, you can begin to read verbs even before you have memorized every form.

This is a practical lesson that prepares you to move from short phrases into real reading.`,
    [
      v('אָמַר', 'amar', 'he said', 'A highly common biblical verb.'),
      v('בָּנָה', 'banah', 'he built', 'A simple and useful root.'),
      v('הָלַךְ', 'halakh', 'he walked / went', 'A very frequent narrative verb.'),
      v('עָנָה', 'anah', 'he answered', 'A verb often found in dialogue.'),
      v('נָתַן', 'natan', 'he gave', 'A verb with a simple, frequent root.')
    ],
    [
      mc('What stays most important when reading Hebrew verbs?', ['The root letters', 'The English article', 'The page number', 'The marginal notes'], 'The root letters', 'The root is the core of the meaning.'),
      tr('What does אָמַר mean?', ['he said', 'he walked', 'he wrote', 'he made'], 'he said', 'Amar is one of the most common verbs.'),
      mc('Which word means "he answered"?', ['עָנָה', 'נָתַן', 'לָמַד', 'שָׁמַר'], 'עָנָה', 'Anah means "he answered."'),
      {
        type: 'sentence_builder',
        question: 'Arrange these words to say "he built" in Hebrew.',
        words: ['הוּא', 'בָּנָה'],
        answer: ['הוּא', 'בָּנָה'],
        explanation: 'The pronoun הוּא goes with the perfect verb form בָּנָה.'
      }
    ],
    26
  ),
  lesson(
    15, 3,
    'Lesson 15 — Demonstratives and Descriptive Phrases',
    'Learn how Hebrew uses this, that, these, and those alongside nouns and adjectives.',
    `Lesson 15 introduces demonstratives and shows how they work with nouns and adjectives in Hebrew.

Demonstrative pronouns allow you to point to something in the sentence: this, that, these, those. Hebrew uses different forms for masculine, feminine, and plural, and these words appear often in narrative and instruction.

This lesson teaches the forms זֶה, זֹאת, and אֵלֶּה and explains how they fit into the sentence structure. You will also practice the way they combine with nouns and adjectives, so you can read phrases such as זֶה סֵפֶר טוֹב and אֵלֶּה הַבָּתִּים הַגְּדוֹלִים.

Understanding demonstratives is important because they are a common part of Hebrew grammar and help you recognize relationships between words in a phrase.`,
    [
      v('זֶה', 'zeh', 'this / this one', 'Masculine singular demonstrative.'),
      v('זֹאת', 'zot', 'this / this one', 'Feminine singular demonstrative.'),
      v('אֵלֶּה', 'elleh', 'these', 'Plural demonstrative.'),
      v('הוּא', 'hu', 'he / it', 'A simple masculine pronoun.'),
      v('הִיא', 'hi', 'she / it', 'A simple feminine pronoun.')
    ],
    [
      mc('Which word is feminine singular?', ['זֹאת', 'זֶה', 'אֵלֶּה', 'הוּא'], 'זֹאת', 'Zot is the feminine singular form.'),
      tr('What does אֵלֶּה mean?', ['these', 'that', 'king', 'not'], 'these', 'Elleh is the plural demonstrative.'),
      mc('Which word is masculine singular?', ['זֶה', 'זֹאת', 'אֵלֶּה', 'הִיא'], 'זֶה', 'Zeh is the masculine singular demonstrative.'),
      {
        type: 'sentence_builder',
        question: 'Arrange the words to form "this book" in Hebrew.',
        words: ['זֶה', 'סֵפֶר'],
        answer: ['זֶה', 'סֵפֶר'],
        explanation: 'The masculine demonstrative זֶה pairs with masculine noun סֵפֶר.'
      }
    ],
    28
  ),
  lesson(
    16, 4,
    'Lesson 16 — Prepositions and Prefixed Particles',
    'Learn the most common Hebrew prepositions and how they attach to words in the sentence.',
    `Lesson 16 explains how many Hebrew prepositions are written as prefixes attached to the noun or verb that follows.

Hebrew prepositions like בְּ, לְ, כְּ, עַל, and מִן appear in almost every phrase. This lesson teaches how they are formed, how they affect meaning, and how they change the relationship between words.

You will read examples such as בְּבַיִת (in the house), לְמֶלֶךְ (to the king), and כְּדָבָר (like a word). These particles are the glue that connects nouns, verbs, and ideas in Hebrew text.

The goal is to build confidence in recognizing prepositions so that you can read longer phrases without losing the link between the parts.`,
    [
      v('בְּ', 'be-', 'in / with', 'A common prefixed preposition.'),
      v('לְ', 'le-', 'to / for', 'Another very common prefix.'),
      v('כְּ', 'ke-', 'like / as', 'Used for comparison.'),
      v('עַל', 'al', 'on / upon', 'A preposition that often appears in phrases.'),
      v('מִן', 'min', 'from', 'A very frequent short preposition.')
    ],
    [
      mc('What does בְּ often mean?', ['in / with', 'not', 'or', 'the'], 'in / with', 'Be- is a basic preposition.'),
      tr('What does לְ mean?', ['to / for', 'and', 'house', 'peace'], 'to / for', 'Le- is a common Hebrew prefix.'),
      mc('What does עַל mean?', ['on / upon', 'before', 'after', 'between'], 'on / upon', 'Al is another common preposition.'),
      {
        type: 'sentence_builder',
        question: 'Arrange the preposition and noun to say "in the house" in Hebrew.',
        words: ['בְּ', 'בַּיִת'],
        answer: ['בְּ', 'בַּיִת'],
        explanation: 'The preposition בְּ attaches to the noun בַּיִת to mean "in the house."'
      }
    ],
    28
  ),
  lesson(
    17, 4,
    'Lesson 17 — Relative Clauses and the Direct Object Marker',
    'Identify the word that links clauses and the marker that marks a definite direct object.',
    `Lesson 17 shows how Hebrew links two ideas together with a relative pronoun and how it marks a definite direct object with את.

The relative pronoun אֲשֶׁר appears in sentences that describe or identify something: "the book that..." or "the man who..." Recognizing it helps you see where a clause begins and ends.

The particle אֶת is a special helper that marks a definite direct object. It does not translate into English but it tells you exactly which noun is receiving the action.

This lesson makes reading Hebrew smoother because you will know when a phrase is a relative clause and when a noun is the definite object of a verb.`,
    [
      v('אֲשֶׁר', 'asher', 'who / that / which', 'A common relative pronoun.'),
      v('אֶת', 'et', 'direct-object marker', 'Marks the definite direct object.'),
      v('מִן', 'min', 'from', 'A frequent short preposition.'),
      v('כִּי', 'ki', 'that / because', 'A conjunction often used in clauses.'),
      v('דָּבָר', 'davar', 'word / thing', 'A very common noun used in many sentences.')
    ],
    [
      mc('Which word marks the direct object?', ['אֶת', 'אֲשֶׁר', 'מִן', 'הַ'], 'אֶת', 'Et marks a definite direct object.'),
      tr('What does אֲשֶׁר mean?', ['who / that / which', 'in', 'good', 'two'], 'who / that / which', 'Asher introduces a relative clause.'),
      mc('Which word means "because" or "that"?', ['כִּי', 'אֶת', 'זֶה', 'אֵלֶּה'], 'כִּי', 'Ki is a common conjunction.'),
      {
        type: 'sentence_builder',
        question: 'Arrange the words to say "the word that" in Hebrew.',
        words: ['הַ', 'דָּבָר', 'אֲשֶׁר'],
        answer: ['הַ', 'דָּבָר', 'אֲשֶׁר'],
        explanation: 'The relative clause begins with אֲשֶׁר after the noun הַדָּבָר.'
      }
    ],
    30
  ),
  lesson(
    18, 4,
    'Lesson 18 — Mid-Course Review of Verbs and Syntax',
    'Review verb patterns, demonstratives, prepositions, and clause markers before continuing to more advanced grammar.',
    `Lesson 18 is a mid-course checkpoint designed to reinforce the grammar from lessons 12 through 17.

This lesson revisits core verb roots, present-tense agreement, demonstratives, prefixed prepositions, and the relative pronoun. The purpose is to build fluency so that you can move forward confidently.

You will practice reading and understanding phrases that blend the grammar you have learned. These review exercises help you see patterns, remember forms, and avoid common beginner mistakes.

By working through this lesson, you are training your eye to recognize how Hebrew grammar holds sentences together. That becomes essential for reading real biblical material.`,
    [
      v('כָּתַב', 'katav', 'he wrote', 'Review of the verb root.'),
      v('זֶה', 'zeh', 'this', 'Review of demonstratives.'),
      v('אֶת', 'et', 'direct-object marker', 'Review of clause structure.'),
      v('זֹאת', 'zot', 'this (feminine)', 'Review of feminine demonstratives.'),
      v('לְמֶלֶךְ', 'lemelekh', 'to the king', 'Review of prepositional phrases.')
    ],
    [
      mc('Which word is a demonstrative?', ['זֶה', 'אֶת', 'מִן', 'כְּ'], 'זֶה', 'Zeh means this.'),
      tr('What does אֶת mark?', ['the direct object', 'the plural', 'the article', 'the future tense'], 'the direct object', 'Et marks the direct object in Hebrew.'),
      mc('Which form means from?', ['מִן', 'לְ', 'הַ', 'זֹאת'], 'מִן', 'Min means from.'),
      {
        type: 'sentence_builder',
        question: 'Arrange the phrase for "to the king" in Hebrew.',
        words: ['לְ', 'מֶלֶךְ'],
        answer: ['לְ', 'מֶלֶךְ'],
        explanation: 'The preposition לְ attaches to king מֶלֶךְ to mean "to the king."'
      }
    ],
    32
  ),
  lesson(
    19, 4,
    'Lesson 19 — Review Test and Confidence Check',
    'Check your grasp of the course so far before moving into more advanced grammar and reading practice.',
    `Lesson 19 is a formal review test that confirms your ability to recognize the essential Hebrew forms learned so far.

This lesson is not about introducing new grammar. It is about proving that you can still identify letters, vowel marks, gender, articles, adjectives, pronouns, verb roots, particles, and clause markers after several lessons.

The review test helps you discover which areas are secure and which require additional practice. That way you enter the final quarter of the course with confidence rather than uncertainty.

You will revisit key concepts in structured examples, and the lesson shows how many of the same ideas appear again and again in real Hebrew reading.`,
    [
      v('הַ', 'ha-', 'the', 'Review of the definite article.'),
      v('כּוֹתֵב', 'kotev', 'writing / he writes', 'Review of present forms.'),
      v('אֲשֶׁר', 'asher', 'who / that / which', 'Review of relative clauses.'),
      v('לֹא', 'lo', 'not', 'Review of negative particles.'),
      v('שָׁלוֹם', 'shalom', 'peace', 'A familiar review noun.')
    ],
    [
      mc('Which word is the article?', ['הַ', 'מִן', 'אֶת', 'זֶה'], 'הַ', 'Ha- is the definite article.'),
      tr('What does כּוֹתֵב mean?', ['writing / he writes', 'king', 'from', 'this'], 'writing / he writes', 'Kotev is the masculine present form.'),
      mc('Which word means who / that / which?', ['אֲשֶׁר', 'לְ', 'בְּ', 'גָּדוֹל'], 'אֲשֶׁר', 'Asher is the relative pronoun.'),
      {
        type: 'sentence_builder',
        question: 'Form the review phrase "the word that" in Hebrew.',
        words: ['הַ', 'דָּבָר', 'אֲשֶׁר'],
        answer: ['הַ', 'דָּבָר', 'אֲשֶׁר'],
        explanation: 'The phrase uses the article, noun, and relative pronoun together.'
      }
    ],
    34
  ),
  lesson(
    20, 4,
    'Lesson 20 — Guttural Verb Roots and Gender',
    'Learn how guttural letters affect verb patterns and continue to practice gender agreement in verbs and adjectives.',
    `Lesson 20 explores verbs whose roots include guttural consonants such as ע, ח, and א.

Guttural letters are special in Hebrew because they can influence vowel sounds and the way forms are pronounced. This lesson explains those changes and gives you practice recognizing verbs that contain guttrals.

The lesson also revisits gender because Hebrew verbs and adjectives still agree with the subject. Understanding guttural roots and gender together is essential for accurate reading.

You will read examples such as רוּחַ, עַם, and חָזָק and see how gutturals appear in both nouns and verbs.`,
    [
      v('רוּחַ', 'ruach', 'spirit / wind', 'A common noun containing a guttural.'),
      v('עַם', 'am', 'people', 'A short noun with a guttural.'),
      v('חָזָק', 'chazaq', 'strong', 'A useful adjective with gutturals.'),
      v('חָכָם', 'chakam', 'wise', 'A related adjective with a guttural.'),
      v('עָלָה', 'alah', 'he went up / he ascended', 'A verb with a guttural root.')
    ],
    [
      mc('What can guttural consonants affect?', ['Verb patterns and pronunciation', 'Only English spelling', 'Only the article', 'Nothing at all'], 'Verb patterns and pronunciation', 'Gutturals can influence how forms are pronounced.'),
      tr('What does רוּחַ mean?', ['spirit / wind', 'house', 'king', 'and'], 'spirit / wind', 'Ruach is a common biblical noun.'),
      mc('What does חָכָם mean?', ['wise', 'strong', 'son', 'king'], 'wise', 'Chakam means wise.'),
      {
        type: 'sentence_builder',
        question: 'Arrange the words to say "he went up" in Hebrew.',
        words: ['הוּא', 'עָלָה'],
        answer: ['הוּא', 'עָלָה'],
        explanation: 'The verb עָלָה is paired with the pronoun הוּא.'
      }
    ],
    34
  ),
  lesson(
    21, 5,
    'Lesson 21 — Negation and Singular Noun Patterns',
    'Form simple negative Hebrew sentences and learn how singular nouns are used in basic statements.',
    `Lesson 21 teaches the two most important negative tools in Hebrew: לֹא and אֵין.

לֹא is the standard negative particle used to deny a verb or statement. אֵין means "there is not" or "there is no" and is used in sentences about existence or absence.

This lesson also reviews singular noun forms so you can understand the structure behind negative sentences and basic declarations. You will practice reading sentences like לֹא הַמֶּלֶךְ אֵין and אֵין סֵפֶר.

These negative sentences are common in narrative and instruction, and mastering them is essential for reading real Hebrew text.`,
    [
      v('לֹא', 'lo', 'not', 'The simplest negative particle.'),
      v('אֵין', 'ein', 'there is not / there is no', 'A common negative expression.'),
      v('בֵּן', 'ben', 'son', 'A frequent singular noun.'),
      v('הַמֶּלֶךְ', 'hamelekh', 'the king', 'A definite noun phrase with the article.'),
      v('שָׁלוֹם', 'shalom', 'peace', 'A familiar noun often used in review.')
    ],
    [
      mc('What does לֹא mean?', ['not', 'and', 'from', 'this'], 'not', 'Lo is the basic negative particle.'),
      tr('What does אֵין mean?', ['there is not / there is no', 'son', 'house', 'root'], 'there is not / there is no', 'Ein is a common negative expression.'),
      mc('Which phrase means "the king"?', ['הַמֶּלֶךְ', 'שָׁלוֹם', 'לֹא', 'אֵין'], 'הַמֶּלֶךְ', 'Hamelekh means the king.'),
      {
        type: 'sentence_builder',
        question: 'Arrange these words to form "not the king" in Hebrew.',
        words: ['לֹא', 'הַמֶּלֶךְ'],
        answer: ['לֹא', 'הַמֶּלֶךְ'],
        explanation: 'The negative particle לֹא comes before the definite noun phrase הַמֶּלֶךְ.'
      }
    ],
    36
  ),
  lesson(
    22, 5,
    'Lesson 22 — The Dual Number',
    'Recognize the Hebrew dual form used for natural pairs such as hands, eyes, and feet.',
    `Lesson 22 introduces the Hebrew dual number, a special plural form used for natural pairs.

Hebrew uses dual forms for words that naturally come in twos, such as hands, feet, and eyes. The dual often ends in -ַיִם or -תַיִם.

This lesson shows you how to read dual nouns and how they differ from ordinary singular and plural forms. That means when you see יָדַיִם or רַגְלַיִם, you immediately know you are reading "two hands" or "two feet."`,
    [
      v('יָדַיִם', 'yadayim', 'two hands', 'A classic dual form.'),
      v('רַגְלַיִם', 'raglayim', 'two feet', 'Another common dual form.'),
      v('שְׁתַּיִם', 'shtayim', 'two (feminine)', 'Dual-related number form.'),
      v('עֵינַיִם', 'einaim', 'two eyes', 'A natural pair that uses the dual.'),
      v('אָזְנַיִם', 'oznayim', 'two ears', 'Another natural pair with dual form.')
    ],
    [
      mc('What does the dual number usually show?', ['A pair', 'A negative', 'A verb tense', 'A root letter'], 'A pair', 'The dual form is used for paired items.'),
      tr('What does יָדַיִם mean?', ['two hands', 'two kings', 'two roots', 'two articles'], 'two hands', 'Yadayim is the dual form for hands.'),
      mc('Which word means "two eyes"?', ['עֵינַיִם', 'יָדַיִם', 'שָׁלוֹם', 'בֵּן'], 'עֵינַיִם', 'Einaim is the dual form for two eyes.'),
      {
        type: 'sentence_builder',
        question: 'Arrange the words to say "two feet" in Hebrew.',
        words: ['רַגְלַיִם'],
        answer: ['רַגְלַיִם'],
        explanation: 'Raglayim means two feet and appears in dual form.'
      }
    ],
    36
  ),
  lesson(
    23, 5,
    'Lesson 23 — The Imperfect Tense',
    'Read imperfect forms and understand how Hebrew expresses incomplete, ongoing, or future action.',
    `Lesson 23 introduces the imperfect tense, which often expresses incomplete, ongoing, or future action in Hebrew.

The imperfect is a powerful aspectual form. It is not always a simple future. It can mean "he will write," "he is writing," or "he does not write," depending on context.

This lesson helps you recognize imperfect verb forms and understand the sense they convey in narrative and poetry. It prepares you to read sentences that describe continuing or future action.`,
    [
      v('יִכְתֹּב', 'yikhtov', 'he will write', 'A common imperfect form.'),
      v('תִּלְמַד', 'tilmad', 'you will learn', 'A second-person imperfect form.'),
      v('נֵלֵךְ', 'nelekh', 'we will go', 'A first-person plural imperfect form.'),
      v('יִרְאֶה', 'yireh', 'he will see', 'A very common imperfect form.'),
      v('יִשְׁמַע', 'yishma', 'he will hear', 'An imperfect form often found in narrative.')
    ],
    [
      mc('What does the imperfect often express?', ['Incomplete or future action', 'Only past action', 'Only nouns', 'Only adjectives'], 'Incomplete or future action', 'Context determines the exact sense.'),
      tr('What does יִכְתֹּב mean?', ['he will write', 'he wrote', 'he is king', 'he is good'], 'he will write', 'Yikhtov is the imperfect form of write.'),
      mc('Which verb means "he will hear"?', ['יִשְׁמַע', 'יִרְאֶה', 'כָּתַב', 'לָמַד'], 'יִשְׁמַע', 'Yishma is the imperfect form meaning he will hear.'),
      {
        type: 'sentence_builder',
        question: 'Select the imperfect form for "he will see".',
        words: ['יִרְאֶה'],
        answer: ['יִרְאֶה'],
        explanation: 'Yireh is the imperfect form meaning he will see.'
      }
    ],
    38
  ),
  lesson(
    24, 5,
    'Lesson 24 — Vocabulary Review and Mastery',
    'Review the most important vocabulary from the entire course and close with a confidence-building final challenge.',
    `Lesson 24 closes the course by reviewing the most important vocabulary you have learned.

This lesson brings the highest-frequency words back into one final practice session so you can test whether the forms are familiar enough to support continued reading.

You will review essential nouns, verbs, particles, and pronouns from the entire course. The lesson ends with a final challenge that asks you to read and recognize the vocabulary in real Hebrew phrases.`,
    [
      v('שָׁלוֹם', 'shalom', 'peace', 'A high-frequency biblical word.'),
      v('חֶסֶד', 'chesed', 'steadfast love / kindness', 'An important theological term.'),
      v('תוֹרָה', 'torah', 'instruction / law', 'A central Hebrew noun.'),
      v('אֱלֹהִים', 'elohim', 'God / gods', 'A foundational Hebrew noun.'),
      v('בֵּן', 'ben', 'son', 'A basic noun used throughout the course.')
    ],
    [
      mc('What does תוֹרָה mean?', ['instruction / law', 'peace', 'king', 'house'], 'instruction / law', 'Torah is a key biblical term.'),
      tr('What does שָׁלוֹם mean?', ['peace', 'root', 'from', 'two'], 'peace', 'Shalom is one of the most familiar Hebrew words.'),
      mc('Which word means steadfast love / kindness?', ['חֶסֶד', 'אֲשֶׁר', 'לֹא', 'בְּ'], 'חֶסֶד', 'Chesed is an important biblical word.'),
      {
        type: 'sentence_builder',
        question: 'Arrange the words to form "God is" in Hebrew.',
        words: ['אֱלֹהִים', 'הוּא'],
        answer: ['אֱלֹהִים', 'הוּא'],
        explanation: 'The noun אֱלֹהִים can be paired with the pronoun הוּא to form "God is."'
      }
    ],
    42
  )
].map((l) => [l.id, l]));

window.HEBREW_LESSON_DATA = HEBREW_LESSON_DATA;
const HEBREW_VIDEO_URLS = {
  1: 'https://www.youtube.com/watch?v=dz7ggYv-Sio', // Ancient Language Institute: Hebrew 101 Introduction
  2: 'https://www.youtube.com/watch?v=_VZA0-_vBak', // Learn Biblical Hebrew: The Hebrew Alphabet Part 1
  3: 'https://www.youtube.com/watch?v=MQmIaVsQT4k', // Hebrew Phonology and Guttural Sounds
  4: 'https://www.youtube.com/watch?v=zKrh87nOl0g', // History of Hebrew Script: Phoenician to Square Script
  5: 'https://www.youtube.com/watch?v=OKPfEeHdkqk', // Hebrew Vowel System and Shewa Mechanics
  6: 'https://www.youtube.com/watch?v=DbcKhPWwi_s', // Gender in Biblical Hebrew
  7: 'https://www.youtube.com/watch?v=FmqKiBQRR0E', // The Hebrew Definite Article
  8: 'https://www.youtube.com/watch?v=NwTvzXv2K44', // Hebrew Adjectives and Agreement
  9: 'https://www.youtube.com/watch?v=RSwwKVdWfj4', // Hebrew Noun Patterns and Declension
  10: 'https://www.youtube.com/watch?v=7F-cDmKmQyE', // Hebrew Personal Pronouns
  11: 'https://www.youtube.com/watch?v=x5bJnkc2v3E', // Introduction to Hebrew Verbs: The Simple Past
  12: 'https://www.youtube.com/watch?v=q8KLpPr6_jc', // Hebrew Past Tense: Wayyiqtol and Perfect
  13: 'https://www.youtube.com/watch?v=NxmL7kyY9qM', // Hebrew Participles as Verbal Adjectives
  14: 'https://www.youtube.com/watch?v=lT4vC_w8r_k', // Hebrew Future Tense: Yiqtol Forms
  15: 'https://www.youtube.com/watch?v=AgO_x2Jz5QM', // Hebrew Verbs: Stem Agreement and Patterns
  16: 'https://www.youtube.com/watch?v=Ub9kyAKPrqQ', // Prepositions in Biblical Hebrew
  17: 'https://www.youtube.com/watch?v=vjOpI5_w1jU', // Hebrew Relative Pronouns and Clauses
  18: 'https://www.youtube.com/watch?v=aL6Bq7d7xMo', // Hebrew Word Order and Basic Syntax
  19: 'https://www.youtube.com/watch?v=7BmYvDO2dHc', // Constructing Complex Sentences in Hebrew
  20: 'https://www.youtube.com/watch?v=PnzLwvLdL5s', // Reading Biblical Hebrew: Passage Analysis
  21: 'https://www.youtube.com/watch?v=A2ePk_8nBH0', // Negation and Negative Structures in Hebrew
  22: 'https://www.youtube.com/watch?v=Y5_tN6dLqE8', // The Dual Number in Hebrew
  23: 'https://www.youtube.com/watch?v=xbWjZcFJr88', // Hebrew Imperfect Tense and Aspect
  24: 'https://www.youtube.com/watch?v=KthA5rzD_Nw'  // Biblical Hebrew Comprehensive Review
};
Object.entries(HEBREW_VIDEO_URLS).forEach(([id, url]) => {
  const lesson = HEBREW_LESSON_DATA[Number(id)];
  if (lesson) lesson.videoUrl = url;
});
window.HEBREW_VIDEO_URLS = HEBREW_VIDEO_URLS;
window.HEBREW_WORLD_STRUCTURE = [
  { id: 1, lessons: [1, 2, 3, 4, 5], requiredWorld: null, name: 'Reading Foundations' },
  { id: 2, lessons: [6, 7, 8, 9, 10], requiredWorld: 1, name: 'Core Grammar' },
  { id: 3, lessons: [11, 12, 13, 14, 15], requiredWorld: 2, name: 'Verbs and Agreement' },
  { id: 4, lessons: [16, 17, 18, 19, 20], requiredWorld: 3, name: 'Syntax and Particles' },
  { id: 5, lessons: [21, 22, 23, 24], requiredWorld: 4, name: 'Review and Mastery' }
];
