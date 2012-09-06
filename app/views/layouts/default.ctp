<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title> <?php echo $title_for_layout; ?></title>
	
	<?php
		echo $html->charset();
		echo $html->meta('icon');
		echo $html->css('blue/generic');
		
		echo $html->css('ext-all-notheme');
	 	echo $html->css('xtheme-blue'); 
		echo $html->css('xdesktop');
		echo $html->css('ext-app');
		echo $html->css('pagi/icons');
		 
		 echo $html->css('gridsummary', 'stylesheet', array('media'=>'all' ), false);
	    echo $html->css('roweditor', 'stylesheet', array('media'=>'all' ), false);  

		echo $html->script('jquery-1.3.2');
		echo $html->script('jquery-idle');
		echo $scripts_for_layout;
	?>		
	<script type="text/javascript" charset="utf-8">
		var HOST_NAME=window.location.host;
		var HOST_PATH='<?php echo $html->url('/'); ?>';
	 
		function remove_loading() { 
		   var targelem = document.getElementById('b2zloading'); 
		   targelem.style.display="none"; 
		} 
		
		$(document).ready(function(){
			 $.idleTimer(1800000);
 			$(document).bind("idle.idleTimer", function(){
			 	window.location='<?php echo $html->url("/user/logout") ?>';
			});
			
			
	
			})

	</script>
	<style type="text/css">
	#b2zloading{
		width:250px;
		height:80px;
		position:absolute;
		border:1px solid black;
		background:#fff;
		top:100px;left:0;
		text-align:center;
	}
	</style>	
	
	
</head>
<body onload="remove_loading()">
<div id="b2zloading">
	<?php echo $html->image('loader.gif'); ?><br/>
	Please wait while loading component...<br/>
	It depends on your connection bandwidth <br/>
</div>
<script type="text/javascript" charset="utf-8">
		aleft=(document.body.clientWidth/2) - 100;
		elm=document.getElementById('b2zloading');
		elm.style.left=aleft+'px';

 
</script>
<?php
echo $javascript->link('adapter/ext/ext-base');

echo $javascript->link('ext-all-debug');
echo $javascript->link('app/xdesktop');
echo $javascript->link('app/app'); 
echo $javascript->link('extra/gridsummary'); 
//echo $javascript->link('extra/imagefield-pack');
echo $javascript->link('extra/roweditor'); 
echo $javascript->link('extra/compositefield');
//echo $javascript->link('extra/iscroll');
?>
<script type="text/javascript">
<?php
if (isset($privVars)){
	foreach ($privVars as $privs){
		echo "var ".$privs['UserPrivList']['priv_name']."=".$privs['UserPrivList']['up_val'].";";
	}	
}
?>
</script>
<script type="text/javascript">
	Ext.BLANK_IMAGE_URL = '<?php echo $html->url("/images/default/s.gif")?>'; 
	Ext.Component.prototype.stateful = false;
	var App = new Ext.App({});
	Ext.ux.ToolbarKeyMap = Ext.extend(Object, (function() {
    var kb,
        owner,
        mappings;

    function addKeyBinding(c) {
        if (kb = c.keyBinding) {
            delete c.keyBinding;
            if (!kb.fn && c.handler) {
                kb.fn = function(k, e) {
                    e.preventDefault();
                    e.stopEvent();
                    c.handler.call(c.scope, c, e);
                }
            }
            mappings.push(kb);
            var t = [];
            if (kb.ctrl) t.push('Ctrl');
            if (kb.alt) t.push('Alt');
            if (kb.shift) t.push('Shift');
            t.push(kb.key.toUpperCase());
            c.hotKey = t.join('+');
            if (c instanceof Ext.menu.Item) {
                c.onRender = c.onRender.createSequence(addMenuItemHotKey);
            } else if ((c instanceof Ext.Button) && (c.showHotKey)) {
                c.onRender = c.onRender.createSequence(addButtonHotKey);
            }
        }
        if ((c instanceof Ext.Button) && c.menu) {
            c.menu.cascade(addKeyBinding);
        }
    }

    function findKeyNavs() {
        delete this.onRender;
        if (owner = this.ownerCt) {
            mappings = [];
            this.cascade(addKeyBinding);
            if (!owner.menuKeyMap) {
                owner.menuKeyMap = new Ext.KeyMap(owner.el, mappings);
                owner.el.dom.tabIndex = 0;
            } else {
                owner.menuKeyMap.addBinding(mappings);
            }
        }
    }

    function addMenuItemHotKey() {
        delete this.onRender;
        this.el.setStyle({
            overflow: 'hidden',
            zoom: 1
        });
        this.el.child('.x-menu-item-text').setStyle({
            'float': 'left'
        });
        this.el.createChild({
            style: {
                padding: '0px 0px 0px 15px',
                float:'right'
            },
            html: this.hotKey
        });
    }

    function addButtonHotKey() {
        delete this.onRender;
        var p = this.btnEl.up('');
        p.setStyle({
            overflow: 'hidden',
            zoom: 1
        });
        p.up('td').setStyle('text-align', 'left');
        this.btnEl.setStyle('.x-menu-item-text').setStyle({
            'float': 'left'
        });
        p = p.createChild({
                style: {
                padding: '0px 0px 0px 15px',
                float: 'right',
                position: 'relative',
                bottom: Ext.isWebKit ? '-1px' : '-2px'
            },
            html: this.hotKey
        });
    }

    return {
        init: function(toolbar) {
            toolbar.onRender = toolbar.onRender.createSequence(findKeyNavs);
            toolbar.doLayout = toolbar.doLayout.createSequence(findKeyNavs);
        }
    }
})());
</script>	
 
<div id="container">
<?php  echo $this->element('eheader')?>
<script type="text/javascript">
	Ext.override(Ext.form.Checkbox, {
     onClick: function (e,o) {
      if (this.readOnly === true){
           e.preventDefault();
      } else {
         if(this.el.dom.checked != this.checked){
         this.setValue(this.el.dom.checked);
         }
      }
     }
});
Ext.override(Ext.form.TextField,{
	selectOnFocus:true
})
</script>
 
<script type="text/javascript">
Ext.override(Ext.form.NumberField, {
    baseChars: "0123456789",
	selectOnFocus:true,
    decimalPrecision:2,
    setValue: function(v){
		 
        v = typeof v == 'number' ? v : String(v).replace(this.decimalSeparator, ".").replace(/,/g, "");
        //v = isNaN(v) ? '' : String(v).replace(".", this.decimalSeparator);
        v = isNaN(v) ? '' : Ext.util.Format.number(this.fixPrecision(String(v)), "0,000,000.00");
        this.setRawValue(v);
        
		return Ext.form.NumberField.superclass.setValue.call(this, v);
    },
    fixPrecision: function(value){
        var nan = isNaN(value);
        if (!this.allowDecimals || this.decimalPrecision == -1 || nan || !value) {
            return nan ? '' : value;
        }
        return parseFloat(value).toFixed(this.decimalPrecision);
    },
    validateValue: function(value){
       
        return true;
    },
    parseValue: function(value){
        value = parseFloat(String(value).replace(this.decimalSeparator, ".").replace(/,/g, ""));
        return isNaN(value) ? '' : value;
    }
});
</script> 
<script type="text/javascript">
Ext.override(Ext.form.ComboBox, {
	onLoad : function(){
		if(!this.hasFocus){
			return;
		}
		if(this.store.getCount() > 0){
			this.expand();
			this.restrictHeight();
			if(this.lastQuery == this.allQuery){
				if(this.editable){
					this.el.dom.select();
				}
				//if(!this.selectByValue(this.value, true)){
				//	this.select(0, true);
				//}
			}else{
				//this.selectNext();
				if(this.typeAhead && this.lastKey != Ext.EventObject.BACKSPACE && this.lastKey != Ext.EventObject.DELETE){
					this.taTask.delay(this.typeAheadDelay);
				}
			}
		}else{
			this.onEmptyResults();
		}
	},
	onViewClick : function(doFocus){
		var index = this.view.getSelectedIndexes()[0];
		var r = this.store.getAt(index);
		if(r){
			this.onSelect(r, index);
		} else {
			this.collapse();
		}
		if(doFocus !== false){
			this.el.focus();
		}
	}
});
 
</script>
<div id="x-desktop">
<?php echo $content_for_layout; ?>
</div>
<div id="ux-taskbar">
	<div id="ux-taskbar-start">&nbsp;</div>
	<div id="ux-taskbuttons-panel"></div>
	<div class="x-clear"></div>
</div>
<div>
	
</div>
</div>
</body>
</html>
