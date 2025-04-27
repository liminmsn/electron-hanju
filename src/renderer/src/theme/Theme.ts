export class Theme {
  constructor(theme: ThemeColor) {
    this.ApplyCssProperty(theme)
  }
  ApplyCssProperty(theme_color: ThemeColor) {
    document.documentElement.style.setProperty('--color-one', theme_color.one)
    document.documentElement.style.setProperty('--color-two', theme_color.two)
    document.documentElement.style.setProperty('--color-text-1', theme_color.text_1)
    document.documentElement.style.setProperty('--color-opacity-02', theme_color.color_opacity_02)
    document.documentElement.style.setProperty('--border-show', theme_color.border_show)
    document.documentElement.style.setProperty('--border-show-inset', theme_color.border_show_inset)
    //存本地
    localStorage.setItem(Theme.name, JSON.stringify(theme_color))
  }
  static reset() {
    localStorage.removeItem(Theme.name)
  }
  static Init(theme: ThemeColor) {
    const theme_loc = localStorage.getItem(Theme.name)
    //如果本地有了就跳过初始化的主题
    if (theme_loc) {
      new Theme(JSON.parse(theme_loc))
    } else {
      new Theme(theme)
    }
  }
}
export class ThemeColor {
  one: string = '#328e6e'
  two: string = '#67ae6e'
  text_1: string = '#E1EEBC'
  color_opacity_02 = 'rgba(var(--color-one),1)'
  border_show: string = '1px 1px 2pt #0000001f'
  border_show_inset: string = '1px 1px 2pt #0000001f inset'

  static get Green() {
    const theme_color = new ThemeColor()
    return theme_color
  }
  static get Yellow() {
    const theme_color = new ThemeColor()
    theme_color.one = '#FFCF50'
    theme_color.two = '#A4B465'
    theme_color.text_1 = 'black'
    return theme_color
  }
  static get Blue() {
    const theme_color = new ThemeColor()
    theme_color.one = '#3A59D1'
    theme_color.two = '#3D90D7'
    theme_color.text_1 = '#E9DFC3'
    return theme_color
  }
  static get Purple() {
    const theme_color = new ThemeColor()
    theme_color.one = '#410445'
    theme_color.two = '#A5158C'
    theme_color.text_1 = '#F6DC43'
    return theme_color
  }
  static get Red() {
    const theme_color = new ThemeColor()
    theme_color.one = '#7D0A0A'
    theme_color.two = '#BF3131'
    theme_color.text_1 = '#EAD196'
    return theme_color
  }
}
