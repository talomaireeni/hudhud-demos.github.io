import $ from './vendor/jquery.js';
import HudhudWidget from './HudhudWidgetApp.js';

$(() => {
    $('head').append(`<link rel="stylesheet" type="text/css" href="https://e6577665-f052-458b-b434-127ba8b5c699-00-2j0ymbufojz3x.spock.replit.dev/css/iconoir.css">`);
    $('head').append(`<link rel="stylesheet" type="text/css" href="https://e6577665-f052-458b-b434-127ba8b5c699-00-2j0ymbufojz3x.spock.replit.dev/css/hudhud-widget-styles.css">`);
    const widget = new HudhudWidget('#506da5', '#c7ced9', 1, ['ar', 'en'], 'ar', 'right', 'https://pbs.twimg.com/profile_images/1755218698686599168/oQzekdiA_400x400.jpg', 'المساعد الذكي', 'لخدمات السجل العيني', 'التسجيل العيني');

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