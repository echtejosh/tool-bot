import {
    CommandInteractionOptionResolver,
    SlashCommandBuilder,
    EmbedBuilder,
} from 'discord.js';
import { createCommand } from '../../app/app';
import { load } from 'cheerio';
import puppeteer from 'puppeteer';

export const weather = createCommand({
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Shows the weather in a specified city')
        .addStringOption((option) =>
            option.setName('country').setDescription('Set country')
        )
        .addStringOption((option) => option.setName('city').setDescription('Set city')),

    cb: async (client, interaction) => {
        const options = interaction.options as CommandInteractionOptionResolver;
        let country = options.getString('country');
        let city = options.getString('city');

        if (!country || !city) {
            await interaction.reply('Please provide a valid country and city.');
            return;
        }

        country = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();
        city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

        const url = `https://www.google.com/search?q=${encodeURIComponent(
            country
        )},+${encodeURIComponent(city)},+weather`;

        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.goto(url);
            await page.waitForSelector('#wob_tm');

            const html = await page.content();
            const $ = load(html);

            const temperature = $('#wob_tm').text();
            const humidity = $('#wob_hm').text();
            const wind = $('#wob_ws').text();
            const precipitation = $('#wob_pp').text();
            const time = $('#wob_dts').text();

            console.log('Temperature: ' + temperature);
            console.log('Humidity: ' + humidity);
            console.log('Wind: ' + wind);
            console.log('Precipitation: ' + precipitation);
            console.log('Time: ' + time);

            await browser.close();

            const embed = new EmbedBuilder()
                .setTitle(`Weather in ${city}, ${country}`)
                .addFields(
                    { name: 'Temperature', value: temperature, inline: true },
                    { name: 'Humidity', value: humidity, inline: true },
                    { name: 'Wind', value: wind, inline: true },
                    { name: 'Precipitation', value: precipitation, inline: true },
                    { name: 'Time', value: time, inline: true }
                );

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching weather data:', error);
            await interaction.reply(
                'An error occurred while fetching weather data. Please try again later.'
            );
        }
    },
});
