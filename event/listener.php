<?php
/**
* phpBB Extension - marttiphpbb datepickerlunar
* @copyright (c) 2018 marttiphpbb <info@martti.be>
* @license GNU General Public License, version 2 (GPL-2.0)
*/

namespace marttiphpbb\datepickerlunar\event;

use phpbb\language\language;
use phpbb\user;
use marttiphpbb\datepickerlunar\util\calc;
use phpbb\event\data as event;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class listener implements EventSubscriberInterface
{
	protected $language;
	protected $calc;

	public function __construct(language $language, user $user)
	{
		$this->language = $language;
		$this->user = $user;
	}

	static public function getSubscribedEvents()
	{
		return [
			'marttiphpbb_jqueryuidatepicker' => ''
		];
	}

	public function core_posting_modify_template_vars(event $event)
	{

	}
}
