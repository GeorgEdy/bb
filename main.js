var app = {};
app.toDo = Backbone.Model.extend({
    defaults: {
        id: 0,
        inputValues: [],
        testValues: [],
        maxTries: -1,
        triesNr: 0
    }
});
var model = new app.toDo();

app.View = Backbone.View.extend({
    initialize: function () {

    },
    events: {
        'click .add-input': 'addInput',
        'click .preview': 'changeViewMode',
        'click .validate': 'validateInputs',
        'click .edit': 'toggle'
    },
    toggle: function () {
        $('.mod').toggle();
        $('.tries-label').toggle();
        $('.validate').toggle();
        $('.add-input').toggle();
        $('.solution').toggle();
        $('.preview').toggle();
        $('.edit').toggle();
    },
    addInput: function (e) {
        e.preventDefault();
        var val = model.get('id');
        val += 1;
        $('.main').append($(".search_template").html());
        for (var i = 0; i < val; i++) {
            $('.input').eq(i).attr('id', i);
        }
        model.set('id', val);
    },
    changeViewMode: function () {
        this.toggle();
        this.testData();
    },
    testData: function () {
        var value = model.get('id');
        var inputValues = model.get('inputValues');
        for (var j = 0; j < value; j++) {
            inputValues.push($('.input').eq(j).val());
        }
        $('.input').val('');
        return inputValues;
    },
    validateInputs: function () {
        var values = model.get('id');
        var inputValues = model.get('inputValues');
        var testValues = model.get('testValues');
        for (var h = 0; h < values; h++) {
            testValues.push($('.input').eq(h).val());
        }
        for (var l = 0; l < values; l++)
            if (testValues[l] == inputValues[l]) {
                $('.input').eq(l).addClass('green');
            }
            else {
                $('.input').eq(l).addClass('red');
            }

        var tries = model.get('tries');

        if(tries == -1) {
            tries = $('.tries').val();
            model.set('tries', tries);
        }
        tries -= 1;
        model.set('tries', tries);
        console.log(tries);
        if( tries == 0) {
            alert('Test');
        }
    }

});

var view = new app.View({el: $(".form-group")});

