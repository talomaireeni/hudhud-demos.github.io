import $ from './jquery.js';
import HudhudWidget from './HudhudWidgetApp.js';

$(() => {
    $('head').append(`<link rel="stylesheet" type="text/css" href="iconoir.css">`);
    $('head').append(`<link rel="stylesheet" type="text/css" href="hudhud-widget-styles.css">`);
    const widget = new HudhudWidget('#211259', '#00ccfa', 1, ['ar', 'en'], 'ar', 'right', 'https://pbs.twimg.com/profile_images/1256269104941600771/-7gOH9hE_400x400.jpg', 'المساعد الذكي', 'لحلول تحليل البيانات والذكاء الاصطناعي', 'علم - حلول تحليل البيانات والذكاء الاصطناعي');

    widget.renderWidget();
    setTimeout(() => {
        widget.addChatElement({ type: 'user-message', message: 'مرحباً، أنا أحمد. أريد أن أعرف كيف يمكنني الاستفادة من خدمات المصالحة في المملكة العربية السعودية؟' });
    }, 200);

    setTimeout(() => {
        widget.addChatElement({ type: 'agent-message', message: 'مرحباً أحمد، أنا هنا لمساعدتك. يمكنك البدء بكتابة سؤالك أو الضغط على أحد الأزرار الموجودة أسفل النافذة.' });
    }, 600);

    setTimeout(() => {
        widget.addChatElement({
            type: 'inline-buttons', buttons: [
                { text: 'المصالحة' },
                { text: 'التحكيم' },
                { text: 'التسوية الودية' },
                { text: 'استفسار' },
                { text: 'الاجابة عن الأسئلة الشائعة جداً' },
                { text: 'التواصل مع الجهات المعنية' },
                { text: 'المزيد من الخدمات' }
            ]
        });
    }, 800);

    setTimeout(() => {
        widget.addChatElement({ type: 'event-message', message: 'تم تحديث النافذة' });
    }, 1000);
});
