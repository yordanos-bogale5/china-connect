import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  zh: {
    translation: {
      "Send Message": "发送消息",
      "Voice Call": "语音通话",
      "Video Call": "视频通话",
      "Attach File": "附加文件",
      "Record Voice": "录制语音",
      Cancel: "取消",
      Send: "发送",
      Reply: "回复",
      Forward: "转发",
      Delete: "删除",
      Edit: "编辑",
      Online: "在线",
      Offline: "离线",
      "Last seen": "最后在线",
      typing: "正在输入...",
      "Create Group": "创建群组",
      "Group Name": "群组名称",
      "Add Members": "添加成员",
      "Leave Group": "退出群组",
      "Delete Group": "删除群组",
      Settings: "设置",
      Profile: "个人资料",
      Language: "语言",
      Notifications: "通知",
      Privacy: "隐私",
      Help: "帮助",
      About: "关于",
    },
  },
  en: {
    translation: {
      // English translations...
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: "zh", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n

