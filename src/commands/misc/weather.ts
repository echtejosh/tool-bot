import {
    CommandInteractionOptionResolver,
    EmbedBuilder,
    SlashCommandBuilder,
} from 'discord.js';
import { createCommand } from '../../app/app';
import { load } from 'cheerio';
import axios from 'axios';

export const weather = createCommand({
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Shows the weather in a specified location')
        .addStringOption((option) => option
            .setName('search_term')
            .setDescription('Provide a search term')
            .setRequired(true),
        ),

    cb: async (client, interaction) => {
        const options = interaction.options as CommandInteractionOptionResolver;
        const term = options.getString('search_term')!;

        try {
            const response = await axios.get(`http://weather.service.msn.com/find.aspx?src=outlook&weadegreetype=C&culture=en-US&weasearchstr=${encodeURI(term)}`, {
                timeout: 2000,
            });

            const $ = load(response.data, {
                xmlMode: true,
            });

            const current = $('current');

            const embed = new EmbedBuilder()
                .setTitle(`Weather in ${current.attr('observationpoint')}`)
                .addFields(
                    {
                        name: 'Temperature',
                        value: current.attr('temperature') + ' °C',
                        inline: true,
                    },
                    {
                        name: 'Condition',
                        value: current.attr('skytext')!,
                        inline: true,
                    },
                    {
                        name: 'Date',
                        value: new Date(current.attr('date')!).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        }),
                        inline: true,
                    },
                    {
                        name: 'Observation time',
                        value: current.attr('observationtime')!.split(':').slice(0, 2).join(':'),
                        inline: true,
                    },
                    {
                        name: 'Feels like',
                        value: current.attr('feelslike') + ' °C',
                        inline: true,
                    },
                    {
                        name: 'Humidity',
                        value: current.attr('humidity')!,
                        inline: true,
                    },
                    {
                        name: 'Wind',
                        value: current.attr('windspeed')!,
                        inline: true,
                    },
                );

            await interaction.reply({
                embeds: [embed],
            });
        } catch (err) {
            await interaction.reply({
                content: 'Unable to fetch weather information, try again',
                ephemeral: true,
            });

            return;
        }
    },
});
