/* global Stem, describe, beforeEach, it */

describe('View::TeachersAsDiscovery', function() {
    'use strict';

    beforeEach(function() {
        this.$Scaffolding = $('<article id="teachers" class="discovery"></article>');
        this.Discovery = new Stem.Models.Discovery();
        this.TeachersAsDiscovery = new Stem.Views.TeachersAsDiscovery({
            el: this.$Scaffolding,
            model: this.Discovery.get('teachers')
        });
    });

    it('Render method should return the view (for chaining).', function() {
        this.TeachersAsDiscovery.render().should.equal(this.TeachersAsDiscovery);
    });

    it('Render method should render search form.', function() {
        var functionSpy = sinon.spy(this.TeachersAsDiscovery, "renderSearch");
        this.TeachersAsDiscovery.render();
        functionSpy.callCount.should.equal(1);

        functionSpy.restore();
    });

    it('After render, the root element of the view should have an ARIA label with a valid id value.', function() {
        var $el = this.TeachersAsDiscovery.render().$el;
        $el.attr('aria-labelledby').should.match(/^[0-9]+$/);
    });

    it('After render, the sole h3 element in the view should have a valid id value.', function() {
        var $el = this.TeachersAsDiscovery.render().$el;
        $el.find('h3').length.should.equal(1);
        $el.find('h3').attr('id').should.match(/^[0-9]+$/);
    });

    it('After render, the anchor elements should exist and have an href of a search with no query.', function() {
        var $el = this.TeachersAsDiscovery.render().$el;

        $el.find('#teachers-search-courses').length.should.equal(1);
        $el.find('#teachers-search-courses').attr('href').should.equal('#search//courses');

        $el.find('#teachers-search-groups').length.should.equal(1);
        $el.find('#teachers-search-groups').attr('href').should.equal('#search//groups');
    });

    it('After render, a change to the query of the teacher model search query, should update the href of the view anchor elements.', function() {
        this.TeachersAsDiscovery.remove();
        var functionSpy = sinon.spy(this.TeachersAsDiscovery, 'updateInvites');
        this.TeachersAsDiscovery.initialize();

        var $el = this.TeachersAsDiscovery.render().$el;
        functionSpy.reset();

        $el.find('form > input.search__input').first().val('Test').trigger('input');
        _.delay(function() {
            functionSpy.callCount.should.equal(1);
            $el.find('#teachers-search-courses').attr('href').should.equal('#search/Test/courses');
            $el.find('#teachers-search-groups').attr('href').should.equal('#search/Test/groups');

            functionSpy.restore();
        }, 260); // 250ms debounce + 10ms delay.
    });

    it('After render, submission of the embedded searchForm should be caught and passed through by this view.', function() {
        var functionSpy = sinon.spy(this.TeachersAsDiscovery, "submitSearch"); // Replace before render-time event binding.
        var eventSpy = sinon.spy();

        var $el = this.TeachersAsDiscovery.render().$el;
        this.TeachersAsDiscovery.on('search:submit', eventSpy);

        $el.find('button.search__submit').first().trigger('click');
        functionSpy.callCount.should.equal(1);
        eventSpy.callCount.should.equal(1);

        this.TeachersAsDiscovery.off('search:submit', eventSpy);
        functionSpy.restore();
    });

    it('After render, if the teachers model has its search model changed, the searchForm property of this view should be updated and re-rendered.', function() {
        this.TeachersAsDiscovery.remove();
        var functionSpy = sinon.spy(this.TeachersAsDiscovery, 'renderSearch');
        this.TeachersAsDiscovery.initialize(); // re-bind event handler to use spy.
        this.TeachersAsDiscovery.render();
        functionSpy.reset(); // render makes a call to renderSearch which we don't care for in this test.

        this.TeachersAsDiscovery.model.unset('searchQuery', { silent: true });
        var newQuery = new Stem.Models.Search({
            label: 'Test Label',
            placeholder: 'Test Placeholder'
        });
        this.TeachersAsDiscovery.model.set('searchQuery', newQuery);

        functionSpy.callCount.should.equal(1);
        this.TeachersAsDiscovery.searchForm.model.should.equal(newQuery);

        functionSpy.restore();
    });

    it('should remove and replace search form if it already exists', function() {
        var $FilledScaffolding = $('<article id="teachers" class="discovery"><div id="test-search-form"></div></article>');
        var newTeachersAsDiscovery = new Stem.Views.TeachersAsDiscovery({
            el: $FilledScaffolding,
            model: this.Discovery.get('teachers')
        });
        var newSearchForm = new Stem.Views.SearchAsForm({
            el: $FilledScaffolding.find('#test-search-form'),
            model: newTeachersAsDiscovery.model.get('searchQuery'),
            theme: 'theme-1-test',
            testOption: 'the-test-option'
        }).render();
        newTeachersAsDiscovery.searchForm = newSearchForm;
        newTeachersAsDiscovery.searchForm.options.testOption.should.equal('the-test-option');

        newTeachersAsDiscovery.render();
        should.not.exist(newTeachersAsDiscovery.searchForm.options.testOption);
    });
});