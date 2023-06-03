import { CommandInteractionOptionResolver, SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { createCommand } from '../../app/app';
import axios from 'axios';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import { ChartConfiguration } from 'chart.js';
import { color } from 'chart.js/helpers';

export const price = createCommand({
    data: new SlashCommandBuilder()
        .setName('price')
        .setDescription('Shows the price of a specified cryptocurrency')
        .addStringOption((option) => option
            .setName('crypto')
            .setDescription('Enter the name of the cryptocurrency')
            .setRequired(true),
        ),

    cb: async (app, interaction) => {
        const options = interaction.options as CommandInteractionOptionResolver;
        const crypto = options.getString('crypto');
        console.log(crypto)
        if (!crypto) {
            interaction.reply('Please provide a cryptocurrency name!').catch(console.log);
            return;
        }

        try {
            const symbol = `${crypto.toUpperCase()}USDT`;
            const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
            const chartData: any[] = (await axios.get(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=4h&limit=128`)).data;
            const cryptoData = response.data.find((obj: any) => obj.symbol === `${crypto.toUpperCase()}USDT`);

            if (chartData.length > 0) {
                const chartSrc = chartData.map((data: any) => {
                    return {
                        close: data[4],
                        open: data[1],
                        high: data[2],
                        low: data[3],
                        time: data[0]
                    };
                });

                const width = 800;
                const height = 400;

                // Create a new instance of ChartJSNodeCanvas
                const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

                const configuration: ChartConfiguration<"line"> = {
                    type: 'line',
                    data: {
                        labels: chartSrc.map((data) => data.time),
                        datasets: [{
                            label: 'Closing Price',
                            data: chartSrc.map((data) => data.close),
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            pointBorderColor: 'rgba(0,255,0,0)',
                            tension: 0.1
                        }]
                    },
                    options: {
                        responsive: false
                    }
                };

                // Generate the chart image as a buffer
                const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);

                // Save the chart image as a PNG file
                const fs = require('fs');
                await fs.writeFileSync('src/commands/misc/chart/chart.png', buffer);

            }

            if (cryptoData) {
                const embed = new EmbedBuilder()
                    .setColor('#00ff00')
                    .setTitle(`Price of ${crypto}`)
                    .setDescription(`Current price: $${cryptoData.lastPrice}`)
                    .addFields([
                        { name: 'Price change (24h)', value: `${cryptoData.priceChangePercent}%`, inline: true },
                    ])
                    .setImage('attachment://chart.png')

                interaction.reply({ embeds: [embed], files:['src/commands/misc/chart/chart.png'] }).catch(console.log);
            }
        } catch (error) {
            console.error(error);
            interaction.reply('An error occurred while fetching the crypto data.').catch(console.log);
        }
    }
});