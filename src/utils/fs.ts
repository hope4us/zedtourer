const fs = {
    phone: (s?: string) => {
        if (!s) return ''
        const phone = s.trim()
        return /\+{}/.test(phone) && phone.length > 5 ? phone : '+260' + phone.slice(-9)
    }
}

export default fs