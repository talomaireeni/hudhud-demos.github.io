import $ from './vendor/jquery.js';
import HudhudWidgetLocalization from './HudhudWidgetLocalization.js';
class HudhudWidget {
    constructor(primaryColor, secondaryColor, size, supportedLanguages = ['ar', 'en'], defaultLanguage = 'ar', position = 'right', logoUrl, titleText, subtitleText, footerText) {
        this.injectInlineStyles(primaryColor, secondaryColor, size);
        this.position = position;
        this.sessionDuration = 30 * 60 * 1000; // 30 minutes
        this.lastInteractionTime = new Date().getTime();
        this.localization = new HudhudWidgetLocalization(supportedLanguages, defaultLanguage);
        this.direction = this.localization.currentLanguage === 'ar' ? 'rtl' : 'ltr';
        this.widgetHeader = this.createWidgetHeader(logoUrl, titleText, subtitleText);
        this.widgetEditor = this.createWidgetEditor();
        this.widgetWarningPopup = this.createWarningPopup();
        this.widgetReferencePopup = this.createReferencePopup();
        this.widgetWrapper = this.createWidgetWrapper(footerText);
        this.widgetChatElements = this.widgetWrapper.find('#hudhud-widget-chat-elements');
    }

    injectInlineStyles(primaryColor, secondaryColor, size) {
        $('head').append(`
            <style>
            #hudhud-widget-wrapper {
                --hw-primary-color: ${primaryColor};
                --hw-primary-transparent-color: ${primaryColor}40;
                --hw-secondary-color: ${secondaryColor};
                --hw-secondary-transparent-color: ${secondaryColor}40;
                --hw-size: ${size};
            }
            </style>`);
    }

    renderWidget() {
        if ($('#hudhud-widget-wrapper').length) {
            return;
        }

        $('body').append(this.widgetWrapper);
    }

    createWidgetHeader(logoUrl, titleText, subtitleText) {
        const l = this.localization;
        const widgetHeader = $(/*html*/`
            <div id="hudhud-widget-header">
                <div id="hudhud-widget-header-logo">
                    <img class="hudhud-widget-logo" src="${logoUrl}"/>
                </div>
                <div id="hudhud-widget-header-title">
                    <h1>${titleText}</h1>
                    <h2>${subtitleText}</h2>
                </div>
                <div id="hudhud-widget-header-actions">
                    <button id="hudhud-widget-language-switch-button">
                        <i class="iconoir-language" title="${l.t('switch_language')}"></i>
                    </button>
                    <button id="hudhud-widget-close-button">
                        <i class="iconoir-xmark hudhud-widget-close-icon"></i>
                    </button>
                </div>
            </div>`);

        widgetHeader.find('#hudhud-widget-language-switch-button').on('click', () => this.switchLanguage());
        widgetHeader.find('#hudhud-widget-close-button').on('click', () => this.showWarningPopup());

        return widgetHeader;
    }

    createWidgetEditor() {
        const l = this.localization;
        const widgetEditor = $(/*html*/`
            <div id="hudhud-widget-editor">
                <div id="hudhud-widget-editor-input">
                    <textarea type="text" id="hudhud-widget-editor-textarea" placeholder="${l.t('editor_placeholder')}"></textarea>
                </div>
                <div id="hudhud-widget-editor-actions">
                    <div id="hudhud-widget-editor-attachment">
                        <button id="hudhud-widget-editor-attachment-file"><i class="iconoir-attachment"></i></button>
                        <button id="hudhud-widget-editor-attachment-emoji-button"><i class="iconoir-emoji"></i></button>
                        <button id="hudhud-widget-editor-attachment-voice"><i class="iconoir-microphone"></i></button>
                    </div>
                    <div id="hudhud-widget-editor-send">
                        <button id="hudhud-widget-editor-send-button">${l.t('send')} <i class="iconoir-send-solid hudhud-widget-reflectable-icon"></i></button>
                    </div>
                </div>
            </div>
        `);

        return widgetEditor;
    }

    createWarningPopup() {
        const l = this.localization;
        const widgetWarningPopup = $(/*html*/`
            <div id="hudhud-widget-warning-popup" class="hudhud-widget-warning-popup-${this.position}-position hudhud-widget-popup-hidden" style="display:none;">
                <div class="hudhud-widget-warning-popup-content">
                    <h2>${l.t('close_warning')}</h2>
                </div>
                <div class="hudhud-widget-warning-popup-actions">
                    <button id="hudhud-widget-warning-popup-confirm-button">${l.t('close_warning_confirm')}</button>
                    <button id="hudhud-widget-warning-popup-cancel-button">${l.t('close_warning_cancel')}</button>
                </div>
            </div>`);

        widgetWarningPopup.find('#hudhud-widget-warning-popup-confirm-button').on('click', () => this.hideWarningPopup());
        widgetWarningPopup.find('#hudhud-widget-warning-popup-cancel-button').on('click', () => this.hideWarningPopup());

        return widgetWarningPopup;
    }

    createReferencePopup() {
        const l = this.localization;
        const widgetReferencePopup = $(/*html*/`
            <div id="hudhud-widget-reference-popup" class="hudhud-widget-reference-popup-${this.position}-position hudhud-widget-popup-hidden" style="display:none;">
                <div class="hudhud-widget-reference-popup-actions">
                    <button id="hudhud-widget-reference-popup-close-button">
                    ${l.t('close_references_button')}
                    <i class="iconoir-xmark-circle-solid hudhud-widget-close-icon"></i>
                    </button>
                </div>
                <div class="hudhud-widget-reference-popup-content">
                    <h1>${l.t('answer_references')}</h1>
                    <div class="hudhud-widget-reference-popup-content-list">
                        <div class="hudhud-widget-reference-popup-content-item">
                            <h2>source 1</h2>
                            <h3>source 1 level-1 title</h3>
                            <h4><i class="iconoir-long-arrow-down-right hudhud-widget-reflectable-icon"></i>source 1 level-2 title</h4>
                            <h5><i class="iconoir-long-arrow-down-right hudhud-widget-reflectable-icon"></i>source 1 level-3 title</h5>
                            <h6><i class="iconoir-long-arrow-down-right hudhud-widget-reflectable-icon"></i>source 1 level-4 title</h6>
                            <p>source 1 content</p>
                        </div>
                        <div class="hudhud-widget-reference-popup-content-item">
                            <h2>source 2</h2>
                            <h3>source 2 level-1 title</h3>
                            <h4>source 2 level-2 title</h4>
                            <h5>source 2 level-3 title</h5>
                            <h6>source 2 level-4 title</h6>
                            <p>source 2 content</p>
                        </div>
                    </div>
                </div>
            </div>`);

        widgetReferencePopup.find('#hudhud-widget-reference-popup-close-button').on('click', () => this.hideReferencePopup());

        return widgetReferencePopup;
    }

    showReferencePopup() {
        this.widgetWrapper
            .find('#hudhud-widget-reference-popup')
            .show()
            .removeClass('hudhud-widget-popup-hidden');
    }

    hideReferencePopup() {
        this.widgetWrapper.find('#hudhud-widget-reference-popup')
            .hide()
            .addClass('hudhud-widget-popup-hidden');
    }

    createWidgetWrapper(footerText) {
        const l = this.localization;
        const widgetWrapper = $(/*html*/`
            <div id="hudhud-widget-wrapper" class="${l.currentLanguage === 'ar' ? 'hudhud-widget-rtl' : ''}">
                <div id="hudhud-widget-container" class="initialized-state hudhud-widget-${this.position}-position">
                    <div id="hudhud-widget-body">
                        <div id="hudhud-widget-header-separator"></div>
                        <div id="hudhud-widget-chat-elements">                                              
                        </div>
                    </div>
                    <div id="hudhud-widget-footer">
                        <div id="hudhud-widget-footer-separator"></div>
                        <div id="hudhud-widget-footer-text">${footerText}</div>
                    </div>
                </div>
                <div id="hudhud-widget-button">
                    <button id="hudhud-widget-open-button" class="hudhud-widget-button-${this.position}-position">
                        <i class="iconoir-chat-bubble-empty-solid"></i>
                    </button>
                </div>
            </div>
        `);

        widgetWrapper.find('#hudhud-widget-container').prepend(this.widgetHeader);
        widgetWrapper.find('#hudhud-widget-footer').before(this.widgetEditor);
        widgetWrapper.find('#hudhud-widget-container').after(this.widgetWarningPopup);
        widgetWrapper.find('#hudhud-widget-container').after(this.widgetReferencePopup);
        widgetWrapper.find('#hudhud-widget-open-button').on('click', () => this.toggleWidget(widgetWrapper));

        return widgetWrapper;
    }

    switchLanguage() {
        const l = this.localization;
        $('#hudhud-widget-wrapper').toggleClass('hudhud-widget-rtl');
        l.switchToLanguage(l.currentLanguage === 'ar' ? 'en' : 'ar');
    }

    toggleWidget(widgetWrapper) {
        widgetWrapper.find('#hudhud-widget-container').removeClass('initialized-state');
        widgetWrapper.find('#hudhud-widget-container').toggleClass('hudhud-widget-is-open');
        widgetWrapper.find('#hudhud-widget-open-button').toggleClass('hudhud-widget-button-is-open');
        widgetWrapper.find('#hudhud-widget-open-button i').toggleClass('iconoir-chat-bubble-empty-solid iconoir-download');
        this.hideWarningPopup();
        this.hideReferencePopup();
    }

    showWarningPopup() {
        this.widgetWrapper
            .find('#hudhud-widget-warning-popup')
            .show()
            .removeClass('hudhud-widget-popup-hidden');
    }

    hideWarningPopup() {
        this.widgetWrapper.find('#hudhud-widget-warning-popup')
            .hide()
            .addClass('hudhud-widget-popup-hidden');
    }

    addChatElement(element) {
        switch (element.type) {
            case 'agent-message':
                this.addAgentMessage(element.message);
                break;
            case 'user-message':
                this.addUserMessage(element.message);
                break;
            case 'event-message':
                this.addEventMessage(element.message);
                break;
            case 'inline-buttons':
                this.AddInlineButtons(element.message, element.buttons);
                break;
            default:
                console.error('Invalid chat element type');
        }

        // Scroll to the bottom of the chat elements animation
        this.widgetChatElements.animate({
            scrollTop: this.widgetChatElements[0].scrollHeight
        }, 500);
    }

    addAgentMessage(message) {
        const l = this.localization;
        const messageElement = $(/*html*/`
            <div class="hudhud-widget-chat-message agent-message">
                <div class="hudhud-widget-chat-message-content">
                    <div class="author-details">
                        <div class="author-photo">
                            <img class="" src="https://cdn.dribbble.com/users/2408198/avatars/normal/b717dc320351f235d7116f1647c55758.jpg?1708593426" />
                        </div>
                        <div class="author-name-text">
                            <div class="author-name">موظف خدمة العملاء</div>
                            <div class="author-time">منذ دقيقتين</div>
                        </div>
                    </div>
                    <div class="message-content">${message}</div>
                </div>
                <div class="hudhud-widget-chat-message-footer">
                    <div class="hudhud-widget-chat-message-references">
                        <button class="hudhud-widget-chat-message-reference-button">${l.t("answer_references")} <i class="iconoir-book-solid"></i> </button>
                    </div>
                    <div class="hudhud-widget-chat-message-actions">
                        <div class="hudhud-widget-chat-message-actions-feedback">
                            <button class="hudhud-widget-chat-message-feedback-button hudhud-widget-reflectable-icon"><i class="iconoir-thumbs-up"></i></button>
                            <button class="hudhud-widget-chat-message-feedback-button hudhud-widget-reflectable-icon"><i class="iconoir-thumbs-down"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `);

        // add reference button event
        messageElement.find('.hudhud-widget-chat-message-reference-button').on('click', () => this.showReferencePopup());

        // add feedback buttons events
        messageElement.find('.hudhud-widget-chat-message-feedback-button').on('click', (e) => {
            // remove the "feedback-sent" class from all feedback buttons
            messageElement.find('.hudhud-widget-chat-message-feedback-button').removeClass('feedback-sent');
            // add the "feedback-sent" class to the clicked button
            $(e.currentTarget).addClass('feedback-sent');
        });

        this.widgetChatElements.append(messageElement);
    }

    addUserMessage(message) {
        const messageElement = $(/*html*/`
            <div class="hudhud-widget-chat-message user-message">
                <div class="hudhud-widget-chat-message-content">
                    <div class="author-details">
                        <div class="author-photo">
                            <img class="" src="https://cdn.dribbble.com/users/2408198/avatars/normal/b717dc320351f235d7116f1647c55758.jpg?1708593426" />
                        </div>
                        <div class="author-name-text">
                            <div class="author-name">أنت</div>
                            <div class="author-time">منذ دقيقتين</div>
                        </div>
                    </div>
                    <div class="message-content">${message}</div>
                </div>
                <div class="hudhud-widget-chat-message-footer">
                </div>
            </div>
        `);

        this.widgetChatElements.append(messageElement);
    }

    addEventMessage(event) {
        const messageElement = $(/*html*/`
            <div class="hudhud-widget-event-message">
                <div class="hudhud-widget-chat-message-content">
                    <div class="message-content">${event}</div>
                </div>
            </div>
        `);

        this.widgetChatElements.append(messageElement);
    }

    AddInlineButtons(message, buttons) {
        const buttonsMessage = $(/*html*/`
        <div class="hudhud-widget-chat-message agent-message">
            <div class="hudhud-widget-chat-message-content">
                <div class="author-details">
                    <div class="author-photo">
                        <img class="" src="https://cdn.dribbble.com/users/2408198/avatars/normal/b717dc320351f235d7116f1647c55758.jpg?1708593426" />
                    </div>
                    <div class="author-name-text">
                        <div class="author-name">موظف خدمة العملاء</div>
                        <div class="author-time">منذ دقيقتين</div>
                    </div>
                </div>
                ${message && message.length ? `<div class="message-content">${message}</div>` : ''}
                <div class="hudhud-widget-inline-buttons-container">
                    ${buttons.map(button => `<button class="hudhud-widget-inline-button">${button.text}</button>`).join('')}
                </div>
            </div>
            <div class="hudhud-widget-chat-message-footer">
            </div>
        </div>            
            `);

        this.widgetChatElements.append(buttonsMessage);
    }
}

export default HudhudWidget;