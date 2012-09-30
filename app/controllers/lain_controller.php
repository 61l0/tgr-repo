<?php
class LainController extends AppController
{
    var $name = 'lain';
	var $uses=null;
	
	function index()
    {
		
     	
    }
	function getpotongan(){
		Configure::write('debug',2);
		$this->layout = 'ajax';
		 
		App::import('Model','potongan');
		$data=new Potongan();
		 
			$dataAll=$data->find('all');
			$count=$data->find('count');
	 
		$dataAll = Set::extract($dataAll,'{n}.Potongan');
		$this->set('dataAll','{"total":'.$count.',"data":'.json_encode($dataAll).'}');
	}  
	function getpajak(){
		Configure::write('debug',2);
		$this->layout = 'ajax';
		 
		App::import('Model','pajak');
		$data=new Pajak();
		 
			$dataAll=$data->find('all');
			$count=$data->find('count');
	 
		$dataAll = Set::extract($dataAll,'{n}.Pajak');
		$this->set('dataAll','{"total":'.$count.',"data":'.json_encode($dataAll).'}');
	}  
	 
}
?>