const bangsRaw = require('./bangs.json');

module.exports = (pluginContext) => {
    return (text, env = {}) => {
        const split = text.split(" ");
        const bang = split[0];
        const query = split.slice(1).join(" ");

        const bangs = Object.keys(bangsRaw).map((key) => {
            const self = {
                bang: key,
                name: bangsRaw[key],
                value: `!${key} ${query}`,
                toZazuObj: () => {
                    return {
                        id: self.key,
                        title: self.value,
                        subtitle: self.name,
                        value: self.value
                    }
                }
            }
            return self;
        })

        return new Promise((resolve, reject) => {

            const results = bangs.reduce((memo, item) => {
                if (query.length > 0) {
                    if(item.bang === bang) {
                        memo.push(item.toZazuObj())
                    }
                }
                else if (item.bang.indexOf(bang) == 0) {
                    memo.push(item.toZazuObj())
                }
                return memo;
            }, [])

            resolve(results)
        })
    }
}
