// Ave Mujica Logic Grimoire - Game Data

const CHARACTERS = [
    {
        id: 'sakiko',
        name: 'Sakiko Togawa',
        role: 'Oblivionis',
        color: '#C4A962',
        quote: '"Logic without emotion is just cruelty."',
        operation: 'Implication',
        symbol: '→',
        song: 'Masquerade Rhapsody Request'
    },
    {
        id: 'uika',
        name: 'Uika Misumi',
        role: 'Doloris',
        color: '#9BA2C8',
        quote: '"To love exclusively is not to love less."',
        operation: 'XOR',
        symbol: '⊕',
        song: 'Angles'
    },
    {
        id: 'mutsumi',
        name: 'Mutsumi Wakaba',
        role: 'Mortis',
        color: '#B692BA',
        quote: '"I am not her. But I am not NOT her."',
        operation: 'Negation',
        symbol: '¬',
        song: "Choir 'S' Choir"
    },
    {
        id: 'umiri',
        name: 'Umiri Yahata',
        role: 'Timoris',
        color: '#D1A885',
        quote: '"Safety is just loneliness with a comfortable name."',
        operation: 'NOR',
        symbol: '↓',
        song: "'S/' The Way"
    },
    {
        id: 'nyamu',
        name: 'Nyamu Yūtenji',
        role: 'Amoris',
        color: '#D5D0BC',
        quote: '"Even if no one sees me, I still exist."',
        operation: 'NAND',
        symbol: '↑',
        song: 'Blue Eyes'
    }
];

const OPERATIONS = [
    {
        name: 'NAND',
        symbol: '↑',
        description: 'Not Both - True unless both are true',
        truthTable: [true, true, true, false]
    },
    {
        name: 'AND',
        symbol: '∧',
        description: 'Both must be true',
        truthTable: [false, false, false, true]
    },
    {
        name: 'NOR',
        symbol: '↓',
        description: 'Neither - True only if both are false',
        truthTable: [true, false, false, false]
    },
    {
        name: 'XOR',
        symbol: '⊕',
        description: 'Exclusive OR - True when exactly one is true',
        truthTable: [false, true, true, false]
    },
    {
        name: 'OR',
        symbol: '∨',
        description: 'Either - True if at least one is true',
        truthTable: [false, true, true, true]
    },
    {
        name: 'Implication',
        symbol: '→',
        description: 'If P then Q - False only when P is true and Q is false',
        truthTable: [true, false, true, true]
    },
    {
        name: 'XNOR',
        symbol: '↔',
        description: 'Equivalence - True when both are the same',
        truthTable: [true, false, false, true]
    },
    {
        name: 'Negation',
        symbol: '¬',
        description: 'Not P - Inverts the truth value',
        truthTable: [true, false, null, null] // Only P matters
    },
    {
        name: 'Tautology',
        symbol: '⊤',
        description: 'Always true - regardless of inputs',
        truthTable: [true, true, true, true]
    },
    {
        name: 'Contradiction',
        symbol: '⊥',
        description: 'Always false - regardless of inputs',
        truthTable: [false, false, false, false]
    },
    {
        name: 'Converse Implication',
        symbol: '←',
        description: 'Q implies P',
        truthTable: [true, true, false, true]
    },
    {
        name: 'Material Nonimplication',
        symbol: '⊅',
        description: 'P but not Q - True when P is true and Q is false',
        truthTable: [false, true, false, false]
    },
    {
        name: 'Converse Nonimplication',
        symbol: '⊄',
        description: 'Q but not P - True when Q is true and P is false',
        truthTable: [false, false, true, false]
    },
    {
        name: 'Projection P',
        symbol: 'P',
        description: 'Returns the value of P',
        truthTable: [false, false, true, true]
    },
    {
        name: 'Projection Q',
        symbol: 'Q',
        description: 'Returns the value of Q',
        truthTable: [false, true, false, true]
    },
    {
        name: 'Negation of Q',
        symbol: '¬Q',
        description: 'Not Q - Inverts Q',
        truthTable: [true, false, true, false]
    }
];

const GATE_SONGS = [
    { 
        index: 0, 
        name: 'NAND', 
        song: 'Ave Mujica', 
        file: 'nand - Ave Mujica.mp3',
        operation: 'NAND',
        meaning: "The band's anthem - not all is as it seems - false only when everything appears true",
        lyric: "We are not merely what you see before you...",
        color: '#5C3A3A'
    },
    { 
        index: 1, 
        name: 'AND', 
        song: 'Sophie', 
        file: 'and - Sophie.mp3',
        operation: 'AND',
        meaning: 'Wisdom requires both knowledge AND understanding - both heart and mind must speak',
        lyric: "In the pursuit of truth, both heart and mind must speak...",
        color: '#9E7B9B'
    },
    { 
        index: 2, 
        name: 'NOR', 
        song: 'Deep Into The Forest', 
        file: 'nor- ~Deep Into The Forest~.mp3',
        operation: 'NOR',
        meaning: 'Neither path leads where you expect - both paths are false',
        lyric: "Lost in the woods where no trail is true...",
        color: '#2C4A2C'
    },
    { 
        index: 3, 
        name: 'XOR', 
        song: 'KiLLKiSS', 
        file: 'xor - KiLLKiSS.mp3',
        operation: 'XOR',
        meaning: 'Kill or kiss - exactly one must be chosen - the ultimate exclusive choice',
        lyric: "The line between love and death blurs...",
        color: '#8B0000'
    },
    { 
        index: 4, 
        name: 'OR', 
        song: 'KuroNoBirthday', 
        file: 'or - KuroNoBirthday.mp3',
        operation: 'OR',
        meaning: 'Darkness or birth - at least one must be true - duality of existence',
        lyric: "A birthday in darkness, where shadows or light may prevail...",
        color: '#2D1B1B'
    },
    { 
        index: 5, 
        name: 'Implication', 
        song: 'Crucifix X', 
        file: 'implication - Crucifix X.mp3',
        operation: 'Implication',
        meaning: 'If you bear the cross, then you must suffer - the promise of sacrifice',
        lyric: "The tenth sacrifice carries the weight of all...",
        color: '#4A2C2C'
    },
    { 
        index: 6, 
        name: 'XNOR', 
        song: 'Georgette Me, Georgette You', 
        file: 'xor  - Georgette Me, Georgette You.mp3',
        operation: 'XNOR',
        meaning: 'I am you if and only if you are me - perfect mutual identity and reflection',
        lyric: "When I become you and you become me, we are complete...",
        color: '#9E7B9B'
    },
    { 
        index: 7, 
        name: 'Symbol II', 
        song: 'Negation of P - Air', 
        file: 'negation of p - Symbol II _ Air.mp3',
        operation: 'Negation of P',
        meaning: 'Wind carries - denies the expected - invisible forces negate what we know',
        lyric: "Invisible forces guide our fate...",
        color: '#6BA5B0'
    },
    { 
        index: 8, 
        name: 'Tautology', 
        song: 'Octagram Dance', 
        file: 'Tautology - Octagram Dance.mp3',
        operation: 'Tautology',
        meaning: 'The eight-pointed star dances eternally - always true, always present',
        lyric: "Eight points, one circle, all moving as one...",
        color: '#C49A6C'
    },
    { 
        index: 9, 
        name: 'Contradiction', 
        song: 'Imprisoned XII', 
        file: 'contradiction- Imprisoned XII.mp3',
        operation: 'Contradiction',
        meaning: 'Freedom is impossible - always false - eternal confinement',
        lyric: "Twelve chains bind the soul in eternal confinement...",
        color: '#1A1A1A'
    },
    { 
        index: 10, 
        name: 'Converse Implication', 
        song: 'Symbol I', 
        file: 'converse implication - Symbol I _ △_Fire.mp3',
        operation: 'Converse Implication',
        meaning: 'Fire transforms - if it burns, then it was ignited - reverse cause and effect',
        lyric: "The triangle burns with consuming passion...",
        color: '#C44C4C'
    },
    { 
        index: 11, 
        name: 'Material Nonimplication', 
        song: 'Symbol III', 
        file: 'material nonimplication - Symbol III _ ▽.mp3',
        operation: 'Material Nonimplication',
        meaning: 'Water carves - only when P without Q - flows under specific conditions',
        lyric: "Flowing tears shape the stone of memory...",
        color: '#3A6B8C'
    },
    { 
        index: 12, 
        name: 'Converse Nonimplication', 
        song: 'Symbol IV', 
        file: 'converse nonimplication - Symbol IV _ Earth.mp3',
        operation: 'Converse Nonimplication',
        meaning: 'Earth grounds - only when Q without P - the soil remembers selectively',
        lyric: "The soil remembers what we forget...",
        color: '#6B4C2C'
    },
    { 
        index: 13, 
        name: 'Projection P', 
        song: 'Alter Ego', 
        file: 'Projection of P- Alter Ego.mp3',
        operation: 'Projection P',
        meaning: 'The mask and the face - true self projects regardless of false self',
        lyric: "The mask and the face cannot both be real...",
        color: '#8A6E8E'
    },
    { 
        index: 14, 
        name: 'Projection Q', 
        song: 'DIVINE', 
        file: 'projection of q - DIVINE.mp3',
        operation: 'Projection Q',
        meaning: 'The gods speak only when we listen - divine truth is projected through faith',
        lyric: "The gods speak only when we listen...",
        color: '#C49A6C'
    },
    { 
        index: 15, 
        name: 'Negation of Q', 
        song: 'Ether', 
        file: 'negation of q -Ether.mp3',
        operation: 'Negation of Q',
        meaning: 'The fifth element negates the other four - beyond the four, the void speaks',
        lyric: "Beyond the four, the void speaks eternal truths...",
        color: '#C4A962'
    }
];

const CHARACTER_SONG_MAP = {
    sakiko: { song: 'Masquerade Rhapsody Request', file: "Ave Mujica - Masquerade Rhapsody Request.mp3" },
    uika: { song: 'Angles', file: 'Ave Mujica - Angles (Official Music Video).mp3' },
    mutsumi: { song: "Choir 'S' Choir", file: "ChoirSChoir.mp3" },
    umiri: { song: "'S/' The Way", file: "StheWay.mp3" },
    nyamu: { song: 'Blue Eyes', file: 'Ave Mujica - Blue Eyes.mp3' }
};

const SECRET_ENDING_CONTENT = {
    notification: {
        title: '🔮 The Final Masquerade 🔮',
        message: 'You have completed all character quests!<br><br>The final truth of Ave Mujica awaits...<br><br>Would you like to experience it now?'
    },
    finale: {
        title: 'THE FINAL MASQUERADE',
        scene: `[SCENE: The five stand on stage, not as band members, but as themselves -
scarred, healing, human. The masks lie at their feet.]`,
        dialogues: {
            sakiko: '"I learned that promises don\'t have to be prisons..."',
            uika: '"I learned that exclusive love can coexist with inclusive belonging..."',
            mutsumi: '"I learned that who I\'m NOT helps define who I AM..."',
            umiri: '"I learned that vulnerability is worth more than safety..."',
            nyamu: '"I learned that I exist whether I\'m seen or not..."'
        },
        allTogether: `All: "We are Ave Mujica. We are broken. We are healing.
We are logical. We are human. We are true."`,
        songListTitle: '[All 16 songs are listed with their true meanings.]',
        finalMessage: `"We are not just logical operations.
We are not just broken girls.
We are Ave Mujica.
And our truth is whatever we make it."`,
        secretAchievement: {
            title: 'THE TRUTH BEYOND THE MASQUERADE - SECRET ENDING',
            scene: '[The five stand together, no masks, no lies, no fear.]',
            dialogues: {
                sakiko: '"We thought logic was the answer. But logic alone couldn\'t heal us."',
                uika: '"XOR said we had to choose. But love doesn\'t have to be exclusive to be true."',
                mutsumi: '"Negation taught us what we\'re NOT. But finding what we ARE was the real journey."',
                umiri: '"NOR kept us safe from hurt. But being safe also meant being alone."',
                nyamu: '"NAND made us chase approval. But the only approval we needed was our own."'
            },
            finalSong: '[They play one final song together - not about escaping their voids, but about filling them with each other.]',
            finalQuote: `"We are Ave Mujica. Not because we're broken.
But because we chose to heal together."`,
            achievement: {
                name: 'Truth Seeker',
                description: 'Discover the ending beyond the masquerade'
            },
            epilogue: `All 16 songs now play their full versions.
The Cathedral's candles burn brighter.
And somewhere, a new melody begins to form...`
        }
    }
};

// Character Quest Truth Tables with themed questions
const CHARACTER_TRUTH_TABLES = {
    sakiko: {
        // Implication: P → Q (If P then Q)
        easy: {
            columns: ['P', 'Q', 'P → Q'],
            rows: [
                { values: ['F', 'F', 'T'], desc: 'No promise, no consequence' },
                { values: ['F', 'T', 'T'], desc: 'Promise broken, but Q exists' },
                { values: ['T', 'F', 'F'], desc: 'Promise kept, Q denied' },
                { values: ['T', 'T', 'T'], desc: 'Both fulfilled' }
            ],
            explanation: 'False promises lead anywhere. Only P→F is false.'
        },
        difficult: {
            columns: ['Promise', 'Truth', 'Implication'],
            rows: [
                { values: ['Lies', 'None', 'T'], desc: 'Lies lead nowhere' },
                { values: ['Lies', 'Some', 'T'], desc: 'False premise, good outcome' },
                { values: ['Honest', 'Broken', 'F'], desc: 'Honest promise denied' },
                { values: ['Honest', 'Kept', 'T'], desc: 'Honest promise fulfilled' }
            ],
            explanation: '"If I promise honestly, then you must keep it" - only broken honesty is false.'
        },
        hard: {
            columns: ['Sacrifice', 'Reward', 'Truth'],
            rows: [
                { values: ['False', 'None', 'T'], desc: 'No cost, no gain' },
                { values: ['False', 'Earned', 'T'], desc: 'False sacrifice, yet reward comes' },
                { values: ['True', 'None', 'F'], desc: 'Sacrifice made, but nothing gained' },
                { values: ['True', 'Earned', 'T'], desc: 'True sacrifice, true reward' }
            ],
            explanation: 'True sacrifice without reward is the only false implication.'
        }
    },
    uika: {
        // XOR: P ⊕ Q (Exactly one is true)
        easy: {
            columns: ['P', 'Q', 'P ⊕ Q'],
            rows: [
                { values: ['F', 'F', 'F'], desc: 'Neither chosen' },
                { values: ['F', 'T', 'T'], desc: 'Only Q chosen' },
                { values: ['T', 'F', 'T'], desc: 'Only P chosen' },
                { values: ['T', 'T', 'F'], desc: 'Both chosen' }
            ],
            explanation: 'XOR is true when exactly ONE is true.'
        },
        difficult: {
            columns: ['Island', 'City', 'XOR'],
            rows: [
                { values: ['Stay', 'Leave', 'T'], desc: 'One choice made' },
                { values: ['Leave', 'Stay', 'T'], desc: 'Opposite choice' },
                { values: ['Both', 'Neither', 'F'], desc: 'No commitment' },
                { values: ['Neither', 'Both', 'F'], desc: 'All or nothing fails' }
            ],
            explanation: '"I can only belong to one place" - both or neither is false.'
        },
        hard: {
            columns: ['Tradition', 'Freedom', 'Honesty'],
            rows: [
                { values: ['Held', 'Lost', 'T'], desc: 'Tradition chosen' },
                { values: ['Lost', 'Held', 'T'], desc: 'Freedom chosen' },
                { values: ['Held', 'Held', 'F'], desc: 'Both held = dishonesty' },
                { values: ['Lost', 'Lost', 'F'], desc: 'Both lost = neither' }
            ],
            explanation: 'XOR demands exclusive truth. Holding both is pretending.'
        }
    },
    mutsumi: {
        // Negation: ¬P (Not P)
        easy: {
            columns: ['P', '¬P'],
            rows: [
                { values: ['F', 'T'], desc: 'NOT false is true' },
                { values: ['T', 'F'], desc: 'NOT true is false' }
            ],
            explanation: 'Simply flip the value.'
        },
        difficult: {
            columns: ['Mask', '¬Mask'],
            rows: [
                { values: ['Perfect', 'Imperfect'], desc: 'Perfect mask reveals imperfection' },
                { values: ['Imperfect', 'Perfect'], desc: 'Imperfect mask reveals truth' }
            ],
            explanation: 'The mask shows what you are NOT.'
        },
        hard: {
            columns: ['Mortis', 'Mutsumi'],
            rows: [
                { values: ['NOT-Me', 'Me'], desc: 'NOT-me is still someone' },
                { values: ['Me', 'NOT-Me'], desc: 'Double negative = affirmation' }
            ],
            explanation: 'NOT NOT-me = me. Negation defines rather than destroys.'
        }
    },
    umiri: {
        // NOR: P ↓ Q (Neither P nor Q)
        easy: {
            columns: ['P', 'Q', 'P ↓ Q'],
            rows: [
                { values: ['F', 'F', 'T'], desc: 'Neither is true' },
                { values: ['F', 'T', 'F'], desc: 'One is true' },
                { values: ['T', 'F', 'F'], desc: 'Other is true' },
                { values: ['T', 'T', 'F'], desc: 'Both are true' }
            ],
            explanation: 'NOR is true ONLY when both are false.'
        },
        difficult: {
            columns: ['Pain', 'Joy', 'NOR'],
            rows: [
                { values: ['None', 'None', 'T'], desc: 'Safe but empty' },
                { values: ['None', 'Present', 'F'], desc: 'Joy found despite safety' },
                { values: ['Present', 'None', 'F'], desc: 'Pain despite isolation' },
                { values: ['Present', 'Present', 'F'], desc: 'Full experience' }
            ],
            explanation: '"Neither hurt nor hope" - the safest life has no joy.'
        },
        hard: {
            columns: ['Belonging', 'Pain', 'Freedom'],
            rows: [
                { values: ['None', 'None', 'T'], desc: 'Neither connection nor hurt' },
                { values: ['None', 'Present', 'F'], desc: 'Pain without connection' },
                { values: ['Present', 'None', 'F'], desc: 'Connection brings vulnerability' },
                { values: ['Present', 'Present', 'F'], desc: 'Full life - hurt and belonging' }
            ],
            explanation: 'NOR protects from pain but also from love. Safety is a lonely truth.'
        }
    },
    nyamu: {
        // NAND: P ↑ Q (Not both)
        easy: {
            columns: ['P', 'Q', 'P ↑ Q'],
            rows: [
                { values: ['F', 'F', 'T'], desc: 'Neither is true' },
                { values: ['F', 'T', 'T'], desc: 'One is true' },
                { values: ['T', 'F', 'T'], desc: 'Other is true' },
                { values: ['T', 'T', 'F'], desc: 'Both are true' }
            ],
            explanation: 'NAND is false ONLY when both are true.'
        },
        difficult: {
            columns: ['Approval', 'Self-Worth', 'NAND'],
            rows: [
                { values: ['None', 'None', 'T'], desc: 'Neither approval nor worth' },
                { values: ['None', 'Present', 'T'], desc: 'Self-worth alone' },
                { values: ['Present', 'None', 'T'], desc: 'Approval alone' },
                { values: ['Present', 'Present', 'F'], desc: 'Both = perfectionism' }
            ],
            explanation: '"You need both approval and worth" - NAND rejects this. You need only ONE.'
        },
        hard: {
            columns: ['Mask', 'Performance', 'Truth'],
            rows: [
                { values: ['Fake', 'Fake', 'T'], desc: 'Both false = freedom' },
                { values: ['Fake', 'Real', 'T'], desc: 'Fake mask, real performance' },
                { values: ['Real', 'Fake', 'T'], desc: 'Real self, fake performance' },
                { values: ['Real', 'Real', 'F'], desc: 'Both true = forced perfection' }
            ],
            explanation: 'NAND asks: "Must you be perfect to exist?" Answer: NO. Only perfection is false.'
        }
    }
};

// Character Quest Dialogues
const QUEST_DIALOGUES = {
    sakiko: {
        stages: [
            {
                title: 'Stage 1: The Weight of Promises',
                dialogue: `Sakiko stands alone on the rooftop, looking out at the city lights.

"The company demanded perfection. And I delivered... through force."

"Every promise I made was a chain. Do this, or else. Be this, or else."

"But somewhere along the way, I forgot that promises don't have to be prisons."

[She turns to you] "I learned that implications work both ways. If I promise you honesty... then you owe me the same."`,
                challenge: 'Identify the correct truth table for Implication (P → Q)'
            },
            {
                title: 'Stage 2: Consequences Unveiled',
                dialogue: `Sakiko's mask cracks slightly.

"When I forced my sister to perform, I said it was for her own good."

"But 'for her own good' doesn't justify cruelty. A truth doesn't make a lie moral."

"The implication was flawed. I confused 'logical consequence' with 'moral permission.'"

"Now I understand: implication shows what follows, not what should follow."`,
                challenge: 'Complete the implication truth table'
            },
            {
                title: 'Stage 3: Liberation',
                dialogue: `Sakiko removes her mask completely.

"The truth table taught me: false implies anything."

"When my promises were built on lies, everything that followed was poisoned."

"But true promises? They lead somewhere worth going."

[She smiles] "I can promise you now: Ave Mujica will be real. Not because it must be... but because we choose it to be."`,
                challenge: 'Final Challenge: Apply implication to unlock the truth'
            }
        ],
        finale: {
            title: 'Oblivionis\' Truth',
            dialogue: `Sakiko: "I learned that promises don't have to be prisons. Implication taught me to be honest about consequences, not to fear them."`,
            reward: `✨ QUEST COMPLETE ✨

You have mastered Implication!

Song Unlocked: Masquerade Rhapsody Request

"Truth doesn't imprison. Only lies do."`
        }
    },
    uika: {
        stages: [
            {
                title: 'Stage 1: The Island of Loneliness',
                dialogue: `Uika sits by the ocean, waves crashing around her.

"Everyone said I had to choose. The beach or the city. Tradition or freedom."

"But why? Why must XOR be exclusive? Why can't I have both?"

[She looks at her reflection in the water] "Maybe... maybe loving my island doesn't mean rejecting the world. Maybe I can carry both."`,
                challenge: 'Identify the XOR truth table'
            },
            {
                title: 'Stage 2: Embracing Duality',
                dialogue: `Uika begins to understand.

"XOR is beautiful, actually. It's honest."

"When one thing is true and one is false... that's life. That's real."

"I don't need to pretend everything can be combined. Sometimes things are different. And that's okay."

"The XOR of my identities isn't a flaw. It's who I am."`,
                challenge: 'Complete the XOR truth table'
            },
            {
                title: 'Stage 3: Integration',
                dialogue: `Uika stands at the shore where two worlds meet.

"I can be on the island AND in the city. I can love tradition AND crave adventure."

"XOR taught me: don't force false unity. Embrace real difference."

"The sea and the land meet at the shore. I can stand there. I can belong everywhere and nowhere."

[She laughs] "Exclusive love isn't less love. It's just... honest."`,
                challenge: 'Final Challenge: Apply XOR to unlock the truth'
            }
        ],
        finale: {
            title: 'Doloris\' Truth',
            dialogue: `Uika: "I learned that exclusive love can coexist with inclusive belonging. XOR and AND aren't enemies - they're different tools for different needs."`,
            reward: `✨ QUEST COMPLETE ✨

You have mastered XOR!

Song Unlocked: Angles

"Different doesn't mean divided."`
        }
    },
    mutsumi: {
        stages: [
            {
                title: 'Stage 1: The Face Behind the Mask',
                dialogue: `Mutsumi stares at her reflection, then at her other self.

"Mortis. The shadow. The NOT of everything I should be."

"But negation isn't evil. It's just... inversion."

"If I am me, then Mortis is NOT-me. But NOT-me is still something."

[Her voice wavers] "Maybe I don't need to destroy her. Maybe I just need to understand what I'm NOT."`,
                challenge: 'Identify the Negation truth table'
            },
            {
                title: 'Stage 2: Integration',
                dialogue: `Mutsumi reaches toward her other self.

"NOT true is false. NOT false is true."

"If I am NOT the perfect idol... then what am I?"

"I'm human. I'm flawed. I'm real."

"The negation of the mask reveals the face beneath. And that's not nothing."`,
                challenge: 'Complete the Negation truth table'
            },
            {
                title: 'Stage 3: Wholeness',
                dialogue: `Mutsumi and Mortis stand together, no longer opposites.

"Without negation, I couldn't define myself. I am me, and I am NOT them."

"The double negative cancels out. I'm just... me."

[They smile as one] "We're not at war anymore. We're not even separate."

"I am Mutsumi. Complete. Whole. Real."`,
                challenge: 'Final Challenge: Apply Negation to unlock the truth'
            }
        ],
        finale: {
            title: 'Mortis\' Truth',
            dialogue: `Mutsumi: "I learned that who I'm NOT helps define who I AM. Negation isn't destruction - it's definition."`,
            reward: `✨ QUEST COMPLETE ✨

You have mastered Negation!

Song Unlocked: Choir 'S' Choir

"We are not broken. We are complete."`
        }
    },
    umiri: {
        stages: [
            {
                title: 'Stage 1: The Fear of Belonging',
                dialogue: `Umiri keeps her distance from the group.

"NOR kept me safe. Neither hurt nor betrayed. Neither hope nor disappointment."

"But neither joy nor connection either."

[She looks at her hands] "I was so afraid of being wounded that I refused to feel anything at all."`,
                challenge: 'Identify the NOR truth table'
            },
            {
                title: 'Stage 2: Breaking Free',
                dialogue: `Umiri takes a tentative step forward.

"NOR is the safest operation. Neither P nor Q means... nothing can go wrong."

"But nothing can go right either."

"I'm tired of safe. I want to risk. I want to belong."`,
                challenge: 'Complete the NOR truth table'
            },
            {
                title: 'Stage 3: Homecoming',
                dialogue: `Umiri joins the group, no longer an outsider.

"Connection is dangerous. People can hurt you."

"But safety without connection is just slow loneliness."

[She reaches out] "I choose the risk. I choose to belong. I choose to feel."

"NOR protected me. But you saved me."`,
                challenge: 'Final Challenge: Apply NOR to unlock the truth'
            }
        ],
        finale: {
            title: 'Timoris\' Truth',
            dialogue: `Umiri: "I learned that vulnerability is worth more than safety. NOR protected me, but connection saved me."`,
            reward: `✨ QUEST COMPLETE ✨

You have mastered NOR!

Song Unlocked: 'S/' The Way

"Safe isn't the same as home."`
        }
    },
    nyamu: {
        stages: [
            {
                title: 'Stage 1: The Mask of Approval',
                dialogue: `Nyamu practices her smile in the mirror.

"NAND: Not both. As long as I wasn't everything, I was nothing."

"I chased approval because I thought that's what NAND demanded."

"But NAND isn't rejection. It's... possibility."`,
                challenge: 'Identify the NAND truth table'
            },
            {
                title: 'Stage 2: Self-Discovery',
                dialogue: `Nyamu's practiced smile fades.

"NAND is strange. Everything except 'both true' is allowed."

"I don't need to be perfect. I just need to be SOMETHING."

"Validation from others was my NAND. I need it to feel real."

[She touches her heart] "But what if I'm already real without it?"`,
                challenge: 'Complete the NAND truth table'
            },
            {
                title: 'Stage 3: Authenticity',
                dialogue: `Nyamu drops the camera smile.

"NAND showed me: I don't need to prove I'm worthy."

"Without the approval NAND, without the perfect mask... what remains?"

[She smiles, genuinely] "Me. Just me. And that's enough."`,
                challenge: 'Final Challenge: Apply NAND to unlock the truth'
            }
        ],
        finale: {
            title: 'Amoris\' Truth',
            dialogue: `Nyamu: "I learned that I exist whether I'm seen or not. NAND was my cage, but now it's just a reminder that my worth comes from within."`,
            reward: `✨ QUEST COMPLETE ✨

You have mastered NAND!

Song Unlocked: Blue Eyes

"I am alive. Finally, truly alive."`
        }
    }
};
