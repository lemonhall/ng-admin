/*global describe,it,expect,$$,element,browser,by*/
describe('Global filter', function () {
    'use strict';

    beforeEach(function() {
        browser.get(browser.baseUrl + '#/list/comments');
    });

    it('should display filters uppon the listview', function () {
        $$('.filters .filter input').then(function (inputs) {
            expect(inputs.length).toBe(2);

            expect(inputs[0].getAttribute('placeholder')).toBe('Global Search');
            expect(inputs[1].getAttribute('placeholder')).toBe('Filter by date');
        });
    });

    it('should filter globally', function () {
        // Filter globally for 'rabbit'
        $$('.filters .filter:nth-child(1) input').sendKeys('rabbit');
        $$('.filters button[type="submit"]').click();
        $$('.grid tr td:nth-child(3)').then(function (tdElements) {
            expect(tdElements.length).toBe(1);
            expect(tdElements[0].getText()).toBe('White Rabbit: it was indeed: she was out of the gr...');
        });
    });

    it('should update the pagination total', function () {
        // Filter globally for 'rabbit'
        $$('.filters .filter:nth-child(1) input').sendKeys('rabbit');
        $$('.filters button[type="submit"]').click();
        $$('ma-datagrid-pagination .total').then(function (totalElements) {
            expect(totalElements[0].getText()).toBe('1 - 1 on 1');
        });
    });

    it('should reset all filters', function () {
        $$('.filters .glyphicon-remove').click();

        $$('ma-datagrid-pagination .total').then(function (totalElements) {
            expect(totalElements[0].getText()).toBe('1 - 10 on 11');
        });
    });
});
