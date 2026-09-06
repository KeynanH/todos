import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import de from './locales/de.json'

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en},
            de: { translation: de}
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation:{
            escapeValue: false
        }
    })

    export function getServerTranslation(lng: string){
        i18n.changeLanguage(lng)
        return {
            t: i18n.t.bind(i18n)
        }
    }

export default i18n