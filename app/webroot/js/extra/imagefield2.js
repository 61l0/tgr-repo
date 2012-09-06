Ext.form.ImageField = Ext.extend(Ext.form.isplayField, {
    autoCreate: {tag: 'img'}
    ,setValue: function(new_value){
        if (new_value == undefined || new_value == null) {
            this.el.dom.src = '/images/no_image.png';
        } else {
            this.el.dom.src = new_value;
        }
    }
    ,initValue : function(){
          this.setValue(this.value);
    }

    ,initComponent: function() {
        Ext.apply(this, {

        });

        Ext.form.ImageField.superclass.initComponent.apply(this);
    }
});

Ext.reg('image_field', Ext.form.ImageField);

