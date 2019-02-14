export default {
    moviePrice (rating) {
        rating = parseFloat(rating)
        if (rating >= 8) return 21250
        else if (rating >= 6) return 16350
        else if (rating >= 3) return 8250
        else return 3500
    },
    truncateDesc (text) {
        if (text.length > 160) {
          return text.substring(0, 157) + '...'
        }
        return text
    },
    runtimeText (runtime) {
        let duration = { hour: 0, minutes: 0 }
        if (runtime) {
            duration.hour = Math.floor(runtime / 60)
            duration.minutes = runtime - (duration.hour * 60)
        }
        return duration
    },
    slugify(text) {
        return text.replace(/\W+/g, '-')
    }
}