import Vue from 'vue';

export default {
    computed: {
        flattenedValues () {
            return this.flatten(this.obj);
        },
    },

    methods: {
        async toggleChildren(property) {
            property._showChildren = !property._showChildren;

            if (typeof property !== 'object') {
                return;
            }
        },
        flatten(obj) {
            let entries = new Map();
            for (let prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    if (Object.prototype.hasOwnProperty.call(obj[prop], "expanded") 
                            && obj[prop]["expanded"] === true) {
                        entries.set(prop, obj[prop]);
                        let recursiveEntries = this.flatten(obj[prop]);
                        recursiveEntries.forEach((value, key) => {
                            entries.set(key, value);
                        });
                    } else if (prop !== 'expanded') {
                        entries.set(prop, obj[prop]);
                    }                
                }
            }

            return entries;
        }
    }
};