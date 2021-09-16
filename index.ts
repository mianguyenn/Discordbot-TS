import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()


const client = new DiscordJS.Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
	],
})

client.on('ready', () => {
	console.log('The bot is ready')
	

	const guildId = '501721534625349632'
	const guild = client.guilds.cache.get(guildId)
	let commands

	if (guild) {
		commands = guild.commands
   } else {
		commands = client.application?.commands
	}

	commands?.create({
	name: 'ping',
	description: 'Kirbo will reply to you~',
	})

	commands?.create({
	name: 'add',
	description: 'Kirbo will multiply for u~',
	options: [
		{
			name: 'num1',
			description: 'The first numbers.',
			required: true,
			type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
		},
		{
			name: 'num2',
			description: 'The second numbers.',
			required: true,
			type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
		},
	],
})
})


client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) {
		return
	}

	const { commandName, options } = interaction

	if (commandName === 'ping') {
		interaction.reply({
			content:'Poyo!',
			// ephemeral: true
		})
	} else if (commandName === 'add') {
		const num1 = options.getNumber('num1')!
		const num2 = options.getNumber('num2')!

		await interaction.deferReply({
			// ephemeral: true
		})

		await new Promise((resolve) => setTimeout(resolve, 1000))

		interaction.editReply({
			content: `The product is ${num1 * num2}`,
		})
	}
});

client.on('ready', async () => {
	let servers = await client.guilds.cache.size
	let servercount = await client.guilds.cache.reduce((a,b) => a+b.memberCount, 0 )
	const activities = [
		`/ping, /add | ${servers} servers`,
		`Kirby's Dreamland with ${servercount} members`,
		`JavaScript`

	]
	setInterval(() => {
		const status = activities[Math.floor(Math.random()*activities.length)]
		client!.user!.setPresence({ activities : [{name : `${status}`}]})
	
	}, 5000)
});
	
client.login(process.env.TOKEN)