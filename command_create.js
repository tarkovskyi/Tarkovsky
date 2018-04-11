module.exports = {
    "Command": class {
        constructor(name, properties, callback) {
            this.name = name;
            this.props = Object.assign({
                "min_args": 0,
                "max_args": Infinity,
                "permissions": [],
                "channels": ["text", "group", "dm"],
                "help": "Использование: `.%{name}%{args}`; каналы: %{channels}; права: %{rights}; альтернативные названия: %{alters}",
                "alters": []
            }, properties);
            this.callback = callback;
        }

        isCommand(str) {
            var alters = this.props.alters;

            for (let v in alters)
                if (str.toLowerCase().startsWith("." + v))
                    return true;

            return str.toLowerCase().startsWith("." + this.name);
        }

        getArgs(content) {
            let arr = content.split(' ');
            arr.shift();
            return arr;
        }

        error(channel, er) {
            channel.sendEmbed({
                "title": "Ошибка команды",
                "color": 15732486,
                "description": "**Описание ошибки**: " + er + '\n**Команда**: ' + this.handleHelp()
            });
        }

        execute(msg, client) {
            let content = msg.content;
            if (!this.isCommand(content))
                return;

            let author = msg.author;
            let channel = msg.channel;
            let member = channel.type === 'text' ? msg.member : null;
            let args = this.getArgs(content);

            if (!this.props.channels.includes(channel.type))
                return this.error(channel, "Команда не предназначена для этого типа канала");

            if (args.length < this.props.min_args || args.length > this.props.max_args)
                return this.error(channel, "Неверное количество аргументов");

            if (typeof this.props.permissions[0] !== 'undefined' && !member.hasPermissions(this.props.permissions, false))
                return this.error(channel, "Недостаточно прав для выполнения этой команды");

            return this.callback({
                channel: channel,
                args: args,
                author: msg.author,
                content: content,
                member: member,
                client: client,
                self: this,
                msg: msg,
                guild: msg.guild
            });
        }

        handleHelp() {
            const Channels = {
                "dm": "Личные сообщения",
                "text": "Текстовые каналы",
                "group": "Групповые сообщения"
            };

            const Rights = {
                "CREATE_INSTANT_INVITE": "Создание приглашений",
                "KICK_MEMBERS": "Кик",
                "BAN_MEMBERS": "Бан",
                "ADMINISTRATOR": "Администратор",
                "MANAGE_CHANNELS": "Управление каналами",
                "MANAGE_GUILD": "Управление сервером",
                "ADD_REACTIONS": "Добавление реакций",
                "READ_MESSAGES": "Чтение сообщений",
                "SEND_MESSAGES": "Отправка сообщений",
                "SEND_TTS_MESSAGES": "Отправка tts-сообщений",
                "MANAGE_MESSAGES": "Управление сообщениями",
                "EMBED_LINKS": "Встравиание ссылок",
                "ATTACH_FILES": "Прикрепление файлов",
                "READ_MESSAGE_HISTORY": "Чтение истории сообщений",
                "MENTION_EVERYONE": "Упомянуть всех",
                "EXTERNAL_EMOJIS": "Использование внешних Эмодзи",
                "CONNECT": "Присоединение к голосовому чату",
                "SPEAK": "Говорить в голосовом чате",
                "MUTE_MEMBERS": "Отключить голос участникам",
                "DEAFEN_MEMBERS": "Отключить звук участникам",
                "MOVE_MEMBERS": "Пемещение участников в голосовом чате",
                "USE_VAD": "Режим по активации голосом",
                "CHANGE_NICKNAME": "Изменение ника",
                "MANAGE_NICKNAMES": "Изменение никнейма у других",
                "MANAGE_ROLES_OR_PERMISSIONS": "Управление правами",
                "MANAGE_WEBHOOKS": "Управлление Webhook'ами",
                "MANAGE_EMOJIS": "Управление Эмодзи"
            }

            let help = this.props.help;

            if (help.search(/\%\{name\}/) !== -1)
                help = help.replace("%{name}", this.name);

            if (help.search(/\%\{args\}/) !== -1) {
                let args = ""
                for (let i = 1; i <= this.props.min_args; i++) {
                    args += " <обязательный аргумент" + i + ">";
                }
                if (this.props.max_args > this.props.min_args)
                    args += " [необязательные аргументы]";
                help = help.replace("%{args}", args);
            }

            if (help.search(/\%\{channels\}/) !== -1) {
                let channels = [];
                this.props.channels.forEach(type => {
                    channels.push(Channels[type]);
                });
                help = help.replace("%{channels}", channels.join(', '));
            }

            if (help.search(/\%\{rights\}/) !== -1) {
                let rights = [];
                this.props.permissions.forEach(right => {
                    rights.push(Rights[right]);
                });
                help = help.replace("%{rights}", rights.join(', '));
            }

            if (help.search(/\%\{alters\}/) !== -1)
                help = help.replace("%{alters}", this.props.alters.join(", "));

            return help;
        }
    },
    "Commands": class {
        constructor() {
            this.commands = [];
            this.help = {};
            this.alters = [];
            this.commandnames = [];
        }

        execute(msg, client) {
            this.commands.forEach(c => {
                c.execute(msg, client);
            });
        }

        handleHelp() {
            var help = [];
            this.commandnames.forEach(el => {
                if (typeof this.alters[el] === 'undefined')
                    help.push(this.help[el]);
            });
            return help.join(';\n');
        }

        push(command) {
            this.commands.push(command);
            this.commandnames.push(command.name);
            this.help[command.name] = command.handleHelp()

            command.props.alters.forEach(al => {
                this.help[al] = command.handleHelp();
                this.alters.push()
            });
        }
    }
};
