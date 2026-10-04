import DefaultTheme from 'vitepress/theme'
import GuideFigure from './components/GuideFigure.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('GuideFigure', GuideFigure)
  }
} satisfies import('vitepress').Theme
