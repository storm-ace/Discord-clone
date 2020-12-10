export function CheckIfEmojiExist(chatArray) {
    var emojiBuilder = ''
    var input = chatArray
    var searchForSyntax = input.indexOf(":")

    if (searchForSyntax > -1) {
        for (let index = searchForSyntax; index < input.length; index++) {
            const element = input[index];
            if (element !== '' && element !== undefined && element !== ' ') {
                emojiBuilder += element
            }
        }
    }

    if (smileyArray[emojiBuilder]) {
        input = SetChatAt(input, searchForSyntax, smileyArray[emojiBuilder])
    }

    return input
}

var smileyArray = {
    ":)": "😀",
    ":-)": "😄",
    ":_)": "😁",
    ":D": "😆",
    ":sweating": "😅",
    ":laugh": "😂",
    ":rolling": "🤣",
    ":blush": "😊"
}

function SetChatAt(str, index, chr) {
    if (index > str.lenght - 1) return str
    return str.substring(0, index) + chr
}

export const EmojiEngine = (e) => CheckIfEmojiExist(e)