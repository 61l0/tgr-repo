<?php
function getstatus($controlname,$controllername){
	if ($controlname==$controllername)
		return "selected";
	else return "unselected";
}
//$usersession=$session->read('PG_USER_SESSION');
?>
<style type="text/css">
#infolog {
	float:right;	
	color:#fff;height:22px;
	padding-right:10px;
}
.clear1{
	clear:both;
}
</style>
<div id="ht">
	<div id="ht1">&nbsp;</div>
	<div id="ht2">
		<div id="ht2logo"></div>
		<div id="ht2menu">
			
			<?php echo $html->link('<span>Home</span>','/',array('class'=>getstatus('indek',$this->params['controller']),'escape'=>false)); ?>
			<?php echo $html->link('<span>Persiapan</span>','/persiapan',array('class'=>getstatus('persiapan',$this->params['controller']),'escape'=>false)); ?>
			<?php echo $html->link('<span>Penerimaan</span>','/penerimaan',array('class'=>getstatus('penerimaan',$this->params['controller']),'escape'=>false)); ?>
			<?php echo $html->link('<span>Pengeluaran</span>','/pengeluaran/',array('class'=>getstatus('pengeluaran',$this->params['controller']),'escape'=>false)); ?>
		    <?php echo $html->link('<span>Akuntansi</span>','/akuntansi/',array('class'=>getstatus('akuntansi',$this->params['controller']),'escape'=>false)); ?>
            <?php echo $html->link('<span>Konfigurasi</span>','/konfigurasi/',array('class'=>getstatus('konfigurasi',$this->params['controller']),'escape'=>false)); ?>
            <?php echo $html->link('<span>Sample</span>','/sample/',array('class'=>getstatus('sample',$this->params['controller']),'escape'=>false)); ?>
		</div>
		<div id="infolog">  
			 
		</div>
	</div>
</div>
	<div id="hm">
		<script type="text/javascript"> 	 
		<?php if (isset($menuscript)) echo $menuscript;?>
		</script>
		 <div id="toolbar"></div>
	 </div>
