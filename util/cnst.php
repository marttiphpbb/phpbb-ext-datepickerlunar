<?php
/**
* phpBB Extension - marttiphpbb datepickerlunar
* @copyright (c) 2018 marttiphpbb <info@martti.be>
* @license GNU General Public License, version 2 (GPL-2.0)
*/

namespace marttiphpbb\datepickerlunar\util;

class cnst
{
	const FOLDER = 'marttiphpbb/datepickerlunar';
	const ID = 'marttiphpbb_datepickerlunar';
	const PREFIX = self::ID . '_';
	const CACHE_ID = '_' . self::ID;
	const L = 'MARTTIPHPBB_DATEPICKERLUNAR';
	const L_ACP = 'ACP_' . self::L;
	const L_MCP = 'MCP_' . self::L;
	const TPL = '@' . self::ID . '/';
	const EXT_PATH = 'ext/' . self::FOLDER . '/';
	const NAME = [
		0	=> 'new',
		1	=> 'q1',
		2	=> 'full',
		3	=> 'q3',
	];
	const ICON = [
		0 	=> 'fa-circle',
		1	=> 'fa-adjust fa-rotate-180',
		2	=> 'fa-circle-o',
		3	=> 'fa-adjust',
	];
}
