<?php
 class AppController extends Controller
{
	var $helpers = array('Html','Form','Javascript','Paginator','Number','Session','Time','Text');
	 
	 var $components    = array('Cookie','Session' );
	  const ORD_LF            = 10;
	  const ORD_SPACE         = 32;
	  const ACTION_KEEP_A     = 1;
	  const ACTION_DELETE_A   = 2;
	  const ACTION_DELETE_A_B = 3;
	
	  protected $a           = '';
	  protected $b           = '';
	  protected $jsinput       = '';
	  protected $jsinputIndex  = 0;
	  protected $jsinputLength = 0;
	  protected $lookAhead   = null;
	  protected $jsoutput      = '';
	function __construct(){
		 parent::__construct();
 	}
	 
	protected function createAllScript($controller=null){
		App::import('Model','form_script');
		
		$formScript=new form_script();
		$scriptpath=ROOT . DS . APP_DIR . DS . 'webroot' . DS .'js'.DS.'app'.DS;
		$scriptarr=array();
		if ($controller!=null) {
			$scriptlist=$formScript->find('all',array('conditions'=>
				array('AND'=>
				array('AND'=>array('fs_enabled'=>1)),
				array('OR'=>array('fs_group'=>$controller,'fs_group2'=>$controller,'fs_group3'=>$controller,'fs_group4'=>$controller))
				)
			,'order'=>'fs_side,fs_order'));
			if (!empty($scriptlist)){
			     
				$allscript='';
				foreach ($scriptlist as $script){
				 	$allscript=$allscript.' '.$script['form_script']['fs_cnt'];
			 	}
			 	// $allscript= $this->pack($allscript);
					
				if (file_exists($scriptpath.$controller.'.js')){
						//kalau exist check CRC
						 
						if (crc32(file_get_contents($scriptpath.$controller.'.js'))!=crc32($allscript)){
							//  echo "ulang?";
							$fp = fopen($scriptpath.$controller.'.js', 'w');
							fwrite($fp,$allscript );
							 
							fclose($fp);
						}
						 
					}
					else {
							$fp = fopen($scriptpath.$controller.'.js', 'w');
							fwrite($fp, $allscript);
							 
							fclose($fp);
							 echo "create new";
					}
			}
             
			
		}
		$scriptarr[]=$controller;
		return $scriptarr;
	}
	
	  function beforeFilter(){
	 	
		 
	 }
	 
	 function genPrivVariable(){
	 	 if ($this->Session->check('PB_USER_SESSION')){
		 	$group='Indek';
			$dataUser=$this->Session->read('PB_USER_SESSION');
			if ($this->params['controller']=='sales')
				$group='Sales';
			else if ($this->params['controller']=='purchasing')
				$group='Purchasing';
			else if ($this->params['controller']=='accounting')
				$group='Accounting';
			else if ($this->params['controller']=='item')
				$group='Item';
			else if ($this->params['controller']=='config')
				$group='Configuration';
			else if ($this->params['controller']=='financial')
				$group='Financial';
            else if ($this->params['controller']=='manufacturing')
                $group='Manufacturing';
			App::import('Model','userprivlist');
			$userpriv=new UserPrivList;
			$dataAll=$userpriv->find('all',array('conditions'=>array('priv_group'=>$group,'user_name'=>$dataUser['user_name'])));
			 return $dataAll;
			
		 }
		
	 }
	/* ini untuk handling error database, terutama trigger/store proc,
	 * penting banget!!
	 */
	 function handleError($code, $description, $file = null, $line = null, $context = null) {
	    if (error_reporting() == 0 || $code === 2048 || $code === 8192) {
	      return;
	    }
		
	    // throw error for further handling
	    throw new exception(strip_tags(substr($description,strpos($description,'ERROR'),strlen($description))));
	  }
	  function pack($jsinput){
			$this->a           = '';
			 $this->b           = '';
			  $this->jsinput       = '';
			  $this->jsinputIndex  = 0;
			  $this->jsinputLength = 0;
			  $this->lookAhead   = null;
			  $this->jsouput      = '';
					   $this->jsinput       = str_replace("\r\n", "\n", $jsinput);
						$this->jsinputLength = strlen($this->jsinput);
							return $this->min();
		}
		 protected function action($command) {
    switch($command) {
      case self::ACTION_KEEP_A:
        $this->jsouput .= $this->a;

      case self::ACTION_DELETE_A:
        $this->a = $this->b;

        if ($this->a === "'" || $this->a === '"') {
          for (;;) {
            $this->jsouput .= $this->a;
            $this->a       = $this->get();

            if ($this->a === $this->b) {
              break;
            }

            if (ord($this->a) <= self::ORD_LF) {
              throw new  Exception('Unterminated string literal.');
            }

            if ($this->a === '\\') {
              $this->jsouput .= $this->a;
              $this->a       = $this->get();
            }
          }
        }

      case self::ACTION_DELETE_A_B:
        $this->b = $this->next();

        if ($this->b === '/' && (
            $this->a === '(' || $this->a === ',' || $this->a === '=' ||
            $this->a === ':' || $this->a === '[' || $this->a === '!' ||
            $this->a === '&' || $this->a === '|' || $this->a === '?' ||
            $this->a === '{' || $this->a === '}' || $this->a === ';' ||
            $this->a === "\n" )) {

          $this->jsouput .= $this->a . $this->b;

          for (;;) {
            $this->a = $this->get();

            if ($this->a === '[') {
              /*
                inside a regex [...] set, which MAY contain a '/' itself. Example: mootools Form.Validator near line 460:
                  return Form.Validator.getValidator('IsEmpty').test(element) || (/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]\.?){0,63}[a-z0-9!#$%&'*+/=?^_`{|}~-]@(?:(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)*[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\])$/i).test(element.get('value'));
              */
              for (;;) {
                $this->jsouput .= $this->a;
                $this->a = $this->get();

                if ($this->a === ']') {
                    break;
                } elseif ($this->a === '\\') {
                  $this->jsouput .= $this->a;
                  $this->a       = $this->get();
                } elseif (ord($this->a) <= self::ORD_LF) {
                  throw new Exception('Unterminated regular expression set in regex literal.');
                }
              }
            } elseif ($this->a === '/') {
              break;
            } elseif ($this->a === '\\') {
              $this->jsouput .= $this->a;
              $this->a       = $this->get();
            } elseif (ord($this->a) <= self::ORD_LF) {
              throw new  Exception('Unterminated regular expression literal.');
            }

            $this->jsouput .= $this->a;
          }

          $this->b = $this->next();
        }
    }
  }

  /**
   * Get next char. Convert ctrl char to space.
   *
   * @return string|null
   */
  protected function get() {
    $c = $this->lookAhead;
    $this->lookAhead = null;

    if ($c === null) {
      if ($this->jsinputIndex < $this->jsinputLength) {
        $c = substr($this->jsinput, $this->jsinputIndex, 1);
        $this->jsinputIndex += 1;
      } else {
        $c = null;
      }
    }

    if ($c === "\r") {
      return "\n";
    }

    if ($c === null || $c === "\n" || ord($c) >= self::ORD_SPACE) {
      return $c;
    }

    return ' ';
  }

  /**
   * Is $c a letter, digit, underscore, dollar sign, or non-ASCII character.
   *
   * @return bool
   */
  protected function isAlphaNum($c) {
    return ord($c) > 126 || $c === '\\' || preg_match('/^[\w\$]$/', $c) === 1;
  }

  /**
   * Perform minification, return result
   *
   * @uses action()
   * @uses isAlphaNum()
   * @return string
   */
   function min() {
    $this->a = "\n";
    $this->action(self::ACTION_DELETE_A_B);

    while ($this->a !== null) {
      switch ($this->a) {
        case ' ':
          if ($this->isAlphaNum($this->b)) {
            $this->action(self::ACTION_KEEP_A);
          } else {
            $this->action(self::ACTION_DELETE_A);
          }
          break;

        case "\n":
          switch ($this->b) {
            case '{':
            case '[':
            case '(':
            case '+':
            case '-':
              $this->action(self::ACTION_KEEP_A);
              break;

            case ' ':
              $this->action(self::ACTION_DELETE_A_B);
              break;

            default:
              if ($this->isAlphaNum($this->b)) {
                $this->action(self::ACTION_KEEP_A);
              }
              else {
                $this->action(self::ACTION_DELETE_A);
              }
          }
          break;

        default:
          switch ($this->b) {
            case ' ':
              if ($this->isAlphaNum($this->a)) {
                $this->action(self::ACTION_KEEP_A);
                break;
              }

              $this->action(self::ACTION_DELETE_A_B);
              break;

            case "\n":
              switch ($this->a) {
                case '}':
                case ']':
                case ')':
                case '+':
                case '-':
                case '"':
                case "'":
                  $this->action(self::ACTION_KEEP_A);
                  break;

                default:
                  if ($this->isAlphaNum($this->a)) {
                    $this->action(self::ACTION_KEEP_A);
                  }
                  else {
                    $this->action(self::ACTION_DELETE_A_B);
                  }
              }
              break;

            default:
              $this->action(self::ACTION_KEEP_A);
              break;
          }
      }
    }

    return $this->jsouput;
  }

  /**
   * Get the next character, skipping over comments. peek() is used to see
   *  if a '/' is followed by a '/' or '*'.
   *
   * @uses get()
   * @uses peek()
   * @throws JSMinException On unterminated comment.
   * @return string
   */
  protected function next() {
    $c = $this->get();

    if ($c === '/') {
      switch($this->peek()) {
        case '/':
          for (;;) {
            $c = $this->get();

            if (ord($c) <= self::ORD_LF) {
              return $c;
            }
          }

        case '*':
          $this->get();

          for (;;) {
            switch($this->get()) {
              case '*':
                if ($this->peek() === '/') {
                  $this->get();
                  return ' ';
                }
                break;

              case null:
                throw new Exception('Unterminated comment.');
            }
          }

        default:
          return $c;
      }
    }

    return $c;
  }

  /**
   * Get next char. If is ctrl character, translate to a space or newline.
   *
   * @uses get()
   * @return string|null
   */
  protected function peek() {
    $this->lookAhead = $this->get();
    return $this->lookAhead;
  }
}
?>