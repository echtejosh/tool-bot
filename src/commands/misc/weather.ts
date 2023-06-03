import {
    CommandInteractionOptionResolver,
    SlashCommandBuilder,
    EmbedBuilder
} from 'discord.js';
import { createCommand } from '../../app/app';

export const weather = createCommand({
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Shows the weather in a specified city')
        .addStringOption((option) => option
            .setName('city')
            .setDescription('Set city'),
        ),

    cb: async (app, interaction) => {
        const weather = require('weather-js');

        const options = interaction.options as CommandInteractionOptionResolver;
        await weather.find({
            search: options.getString('city'),
            degreeType: 'C'
        }, function (err: any, result: any) {
            if (err) {
                console.log(err);
                return;
            }

            console.log('Result:', result);

            if (result?.[0]?.location && result[0].current) {
                const embed = new EmbedBuilder()
                    .setTitle(`Weather in ${result[0].location.name}`)
                    .setDescription(`**${result[0].current.skytext}**`)
                    .addFields([
                        {name: 'Temperature', value: `${result[0].current.temperature}°C`, inline: true},
                        {name: 'Feels like', value: `${result[0].current.feelslike}°C`, inline: true},
                        {name: 'Humidity', value: `${result[0].current.humidity}%`, inline: true},
                        {name: 'Wind speed', value: `${result[0].current.windspeed}`, inline: true},
                        {name: 'Wind display', value: `${result[0].current.winddisplay}`, inline: true},
                        {name: 'Time', value: `${result[0].current.observationtime}`, inline: true},
                        {name: 'Date', value: `${result[0].current.date}`, inline: true}
                    ]);

                interaction.reply({
                    embeds: [embed]
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                console.log('Invalid result:', result);
            }
        });
    }
});