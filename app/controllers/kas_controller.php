<?php
class KasController extends AppController
{
    var $name = 'kas';
	var $uses=null;
	
	function index()
    {
		
     	
    }
	function getbalance(){
		
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','kasbalancelist');
		$kasbal=new KasBalanceList;
		$limit=20;$start=0;
		$un_id='*';
		 
		if(isset($_POST['limit']))
			$limit = $_POST['limit'];
	 	if(isset($_POST['start']))
			$start= $_POST['start'];
		if(isset($_POST['un_id']))
			$un_id=(trim($_POST['un_id']));
		 
		$page = ($start/$limit)+1;
	 
			$whereis=array( 'conditions'=>array('AND'=>
			array('AND'=>array(
					 
					array('un_id' =>"$un_id") 
				 )) 
			),
			'order'=> 'KasBalanceList.cb_seq asc' ,'limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>
				array('AND'=>array(
					 
					array('un_id' =>"$un_id") 
				 )) 
			));
		 
		$dataAll=$kasbal->find('all',$whereis);
		$count=$kasbal->find('count',$wherecount);
		$results = Set::extract($dataAll,'{n}.KasBalanceList');
 		$this->set('dataAll','{"total":'.$count.',"data":'.json_encode($results).'}');

	}
	function getsubbalance(){
		
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','subkasbalancelist');
		$kasbal=new SubkasBalanceList;
		$limit=20;$start=0;
		$un_id='*';
		 $bpp='*';
		 
		if(isset($_POST['limit']))
			$limit = $_POST['limit'];
	 	if(isset($_POST['start']))
			$start= $_POST['start'];
		if(isset($_POST['bpp']))
			$bpp=(trim($_POST['bpp']));
		 
		$page = ($start/$limit)+1;
	 
			$whereis=array( 'conditions'=>array('AND'=>
			array('AND'=>array(
					 
					array('un_id' =>"$un_id"),
					array('kas_benda' =>"$bpp") 
				 )) 
			),
			'order'=> 'SubkasBalanceList.cb_seq asc' ,'limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>
				array('AND'=>array(
					 
					array('un_id' =>"$un_id"),
					array('kas_benda' =>"$bpp") 
				 )) 
			));
		 
		$dataAll=$kasbal->find('all',$whereis);
		$count=$kasbal->find('count',$wherecount);
		$results = Set::extract($dataAll,'{n}.SubkasBalanceList');
 		$this->set('dataAll','{"total":'.$count.',"data":'.json_encode($results).'}');

	}
}