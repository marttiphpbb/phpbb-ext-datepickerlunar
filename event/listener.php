<?php
/**
* phpBB Extension - marttiphpbb datepickerlunar
* @copyright (c) 2018 marttiphpbb <info@martti.be>
* @license GNU General Public License, version 2 (GPL-2.0)
*/

namespace marttiphpbb\datepickerlunar\event;

use phpbb\user;
use phpbb\event\data as event;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class listener implements EventSubscriberInterface
{
	protected $user;

	public function __construct(user $user)
	{
		$this->user = $user;
	}

	static public function getSubscribedEvents()
	{
		return [
			'marttiphpbb.jqueryuidatepicker' => 'load',
		];
	}

	public function load(event $event)
	{
		$context = $event['context'];

		$datetime = $this->user->create_datetime();

		$context['marttiphpbb_datepickerlunar'] = [
			'offset'	=> $datetime->getOffset(),
			'time_utc'	=> $datetime->getTimestamp(),
		];

		$event['context'] = $context;
	}
}
