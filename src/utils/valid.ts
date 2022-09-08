const CARD_REGEX = /^(\d{7}|\d{16})$/
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const PHONE_REGEX = /^(\s|)(\+|)(26|)(0|)[79][567]\d{7}(\s|)$/

const card = (s = '') => CARD_REGEX.test(s.trim())
const email = (s = '') => EMAIL_REGEX.test(s.trim())
const phone = (s = '') => PHONE_REGEX.test(s)

const fields = (model: any, body: any) => {
    let isValid = true
    const {tree} = model.schema
    const keys = Object.keys(tree).filter(i => !!tree[i].required)

    for (const key of keys) {
        if (!body[key]) {
            isValid = false
            break
        }
    }

    return isValid
}

const valid = {card, email, phone, fields}
export default valid