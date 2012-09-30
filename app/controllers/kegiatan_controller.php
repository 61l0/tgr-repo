<?php
class KegiatanController extends AppController
{
    var $name = 'kegiatan';
	var $uses=null;
	
	function index()
    {
		
     	
    }
	function getproglist(){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','program');
		$detaillist=new Program;
		$mid=0;
		$limit=10;$start=0;
		if(isset($_POST['limit']))
			$limit = $_POST['limit'];
		 if(isset($_POST['start']))
			$start= $_POST['start'];
		 $page = ($start/$limit)+1;
		$key='';
		if (isset($_REQUEST['query']))
			$key=strtolower($_REQUEST['query']);
		if(isset($_POST['un_id']))
			$mid = $_POST['un_id'];
		$whereis=array('conditions'=>array('AND'=>array('OR'=>array(array('lower(Program.prog_kode) LIKE '=>"%$key%"),
										array('lower(Program.prog_nama) LIKE '=>"%$key%")))),
									'order'=>'Program.prog_kode','limit'=>$limit,'page'=>$page);
		$wherecount=array('conditions'=>array('AND'=>array('OR'=>array(array('lower(Program.prog_kode) LIKE '=>"%$key%"),
										array('lower(Program.prog_nama) LIKE '=>"%$key%")))));
		$dataAll=$detaillist->find('all',$whereis);
		$count=$detaillist->find('count',$wherecount);
		 $results = Set::extract($dataAll,'{n}.Program');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function getkeglist(){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','kegiatan');
		$detaillist=new Kegiatan;
		$mid=0;
		$limit=10;$start=0;
		if(isset($_POST['limit']))
			$limit = $_POST['limit'];
		 if(isset($_POST['start']))
			$start= $_POST['start'];
		 $page = ($start/$limit)+1;
		$key='';
		if (isset($_REQUEST['query']))
			$key=strtolower($_REQUEST['query']);
		if(isset($_POST['prog_kode']))
			$mid = $_POST['prog_kode'];
		if ($key!=""){
			$key=strtolower($key);
			$whereis=array('conditions'=>array('AND'=>array('OR'=>array(array('lower(Kegiatan.keg_kode) LIKE '=>"%$key%"),
											array('lower(Kegiatan.keg_nama) LIKE '=>"%$key%"))),
											array('AND'=>array('Kegiatan.prog_kode'=>$mid))),
										'order'=>'Kegiatan.keg_kode','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array('OR'=>array(array('lower(Kegiatan.keg_kode) LIKE '=>"%$key%"),
											array('lower(Kegiatan.keg_nama) LIKE '=>"%$key%"))) ,
											array('AND'=>array('Kegiatan.prog_kode'=>$mid))));
			$dataAll=$detaillist->find('all',$whereis);
			$count=$detaillist->find('count',$wherecount);
		}
		else {
			$dataAll=$detaillist->find('all' ,array('conditions'=>array('Kegiatan.prog_kode'=>$mid),'limit'=>$limit,'page'=>$page));
			$count=$detaillist->find('count',array('conditions'=>array('Kegiatan.prog_kode'=>$mid)));
		}
		 $results = Set::extract($dataAll,'{n}.Kegiatan');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
}