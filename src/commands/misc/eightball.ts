import { SlashCommandBuilder } from 'discord.js';
import { createCommand } from '../../app/app';

export const eightball = createCommand({
    data: new SlashCommandBuilder()
        .setName('eightball')
        .setDescription('Answers a given question with a random answer')
        .addStringOption((option) => option
            .setName('question')
            .setDescription('Provide a question')
            .setRequired(true),
        ),

    cb: async (app, interaction) => {
        const list1 = [
            'It is certain',
            'It is decidedly so',
            'Without a doubt',
            'Yes definitely',
            'You may rely on it',
            'As I see it, yes',
            'Most likely',
            'Outlook good',
            'Yes',
            'Signs point to yes',
        ];

        const list2 = [
            'Reply hazy, try again',
            'Ask again later',
            'Better not tell you now',
            'Cannot predict now',
            'Concentrate and ask again',
        ];

        const list3 = [
            'Don\'t count on it',
            'My reply is no',
            'My sources say no',
            'Outlook not so good',
            'Very doubtful',
        ];

        const answers = list1.concat(list2, list3);
        const index = Math.floor(Math.random() * answers.length);

        await interaction.reply(answers[index]);
    },
});