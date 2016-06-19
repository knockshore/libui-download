import test from 'ava';
import pathExists from 'path-exists';
import 'babel-register';
import download from './';

test('Download a release', async t => {
	const zipPath = await download({
		version: '0.0.11',
		arch: 'x64',
		platform: 'linux'
	});

	t.true(await pathExists(zipPath));
});

test('Throws error on 404', async t => {
	const ex = await t.throws(download({
		version: '0.25.1',
		arch: 'ia32',
		platform: 'win32'
	}));
	t.is(ex.message, 'Failed to find libui 0.25.1 for win32-ia32 at https://github.com/parro-it/libui/releases/download/0.25.1/libui-shared-windows-ia32-0.25.1.tar.gz');
});
