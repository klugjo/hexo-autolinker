var filter = require('../lib/filter');
var assert = require('assert');

describe('hexo-autolinker', function() {
    describe('with default config', function() {

        it('should convert links to HTML links', function() {
            var result1 = filter('http://google.com');
            var result2 = filter('www.google.com');
            var result3 = filter('google.com');

            assert.equal(result1, '<a href="http://google.com" target="_blank" rel="noopener noreferrer">http://google.com</a>');
            assert.equal(result2, '<a href="http://www.google.com" target="_blank" rel="noopener noreferrer">www.google.com</a>');
            assert.equal(result3, '<a href="http://google.com" target="_blank" rel="noopener noreferrer">google.com</a>');
        });

        it('should convert email adress to HTML mailto links', function () {

            var result = filter('email@google.com');

            assert.equal(result, '<a href="mailto:email@google.com" target="_blank" rel="noopener noreferrer">email@google.com</a>');
        });

        it('should not convert phone number to HTML links', function () {

            var result = filter('123-456-7890');

            assert.equal(result, '123-456-7890');
        });

        it('should not convert twitter handles HTML links', function () {

            var result = filter('@TwitterUser');

            assert.equal(result, '@TwitterUser');
        });

        it('should not convert hashtags handles HTML links', function () {

            var result = filter('#hashtag');

            assert.equal(result, '#hashtag');
        });
    });

    describe('with custom configuration elements', function () {

        it('should not convert links when urls:false', function () {

            var filterNoUrls = filter.bind({config: {autolinker: {urls: false}}});

            var result1 = filterNoUrls('http://google.com');
            var result2 = filterNoUrls('www.google.com');
            var result3 = filterNoUrls('google.com');

            assert.equal(result1, 'http://google.com');
            assert.equal(result2, 'www.google.com');
            assert.equal(result3, 'google.com');
        });

        it('should not convert email addresses when email:false', function () {

            var filterNoEmails = filter.bind({config: {autolinker: {email: false}}});

            var result = filterNoEmails('email@google.com');

            assert.equal(result, 'email@google.com');
        });

        it('should convert phone numbers when phone:true', function () {

            var filterWithPhone = filter.bind({config: {autolinker: {phone: true}}});

            var result = filterWithPhone('123-456-7890');

            assert.equal(result, '<a href="tel:1234567890" target="_blank" rel="noopener noreferrer">123-456-7890</a>');
        });

        it('should convert Twitter handles when twitter:true', function () {

            var filterWithPhone = filter.bind({config: {autolinker: {twitter: true}}});

            var result = filterWithPhone('@TwitterUser');

            assert.equal(result, '<a href="https://twitter.com/TwitterUser" target="_blank" rel="noopener noreferrer">@TwitterUser</a>');
        });

        it('should convert hashtags to when hashtag:instagram', function () {

            var filterWithPhone = filter.bind({config: {autolinker: {hashtag: 'instagram'}}});

            var result = filterWithPhone('#HashTag');

            assert.equal(result, '<a href="https://instagram.com/explore/tags/HashTag" target="_blank" rel="noopener noreferrer">#HashTag</a>');
        });

        it('should should add custom class when className is set', function () {

            var filterWithClass = filter.bind({config: {autolinker: {className: 'test'}}});

            var result = filterWithClass('http://google.com');

            assert.equal(result, '<a href="http://google.com" class="test test-url" target="_blank" rel="noopener noreferrer">http://google.com</a>');
        });
    });
});