<?php
class BankController extends AppController
{
    var $name = 'bank';
	var $uses=null;
	
	function index()
    {
		
     	
    }
	function searchbank(){
		Configure::write('debug',2);
		$this->layout = 'ajax';
		$limit=10;$start=0;
		if(isset($_POST['query']))
			$key = $_POST['query'];
		else $key="";
		if(isset($_POST['limit']))
			$limit = $_POST['limit'];
		$limit=20;
	 	$this->layout='ajax';
		if(isset($_POST['start']))
			$start= $_POST['start'];
		$start=0;
		$page = ($start/$limit)+1;
		App::import('Model','bank');
		$bank=new Bank();
		if ($key!=""){
			$key=strtolower($key);
		$whereis=array('conditions'=>array('OR'=>array(array('lower(Bank.bank_norek) LIKE '=>"%$key%"),
										array('lower(Bank.bank_nama) LIKE '=>"%$key%"))),
									'order'=>'Bank.bank_norek','limit'=>$limit,'page'=>$page);
		$wherecount=array('conditions'=>array('OR'=>array(array('lower(Bank.bank_norek) LIKE '=>"%$key%"),
										array('lower(Bank.bank_nama) LIKE '=>"%$key%"))) );
		$dataAll=$bank->find('all',$whereis);
		$count=$bank->find('count',$wherecount);
		}
		else {
			$dataAll=$bank->find('all' ,array('limit'=>$limit,'page'=>$page));
			$count=$bank->find('count');
		}
		$dataAll = Set::extract($dataAll,'{n}.Bank');
		$this->set('dataAll','{"total":'.$count.',"banks":'.json_encode($dataAll).'}');
	}  
	 
}
?>