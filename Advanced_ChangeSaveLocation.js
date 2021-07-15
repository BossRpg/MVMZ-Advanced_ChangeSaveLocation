/*:
 * @plugindesc Advanced - Change Save Location (MV and MZ)
 *  Version 0.1 Beta (Works only with Windows)
 * @author DevWithCoffee (Aka Dev_With_Coffee)
 *
 * @param location
 * @desc If you try to enter manually it will be set to Default automatically
 * @type select
 * @default {Game}\save\
 * @option {Game}\save\
 * @value Default
 * @option {Game}\
 * @value Current Folder
 * @option {SO}:\ProgramData\
 * @value ProgramData
 * @option {SO}:\Users\{User}\Appdata\Local\
 * @value Appdata-Local
 * @option {SO}:\Users\{User}\Appdata\Roaming\
 * @value Appdata-Roaming
 * @option {SO}:\Users\Public\Documents\
 * @value Public Documents
 * @option {SO}:\Users\{User}\
 * @value Current User
 * @option {SO}:\Users\{User}\Documents\
 * @value Documents of Current User
 *
 * @param dir_save_name
 * @desc To set a different name change to "Text" and enter manually
 * @type select
 * @default GameTitle
 * @option GameTitle
 * @value GameTitle
 * @option GameTitle (without space)
 * @value TitleNoSpace
 * @option GameTitle (underline replaces spaces)
 * @value TitleWithUnderline
 *
 * @help Advanced_ChangeSaveLocation.js
 * location: Here you define the path to the savefiles
 *  {Game} is where files are located, like Game.exe
 *  {SO} is the drive where the operating system is installed, like C
 *  {User} is the connected user's folder
 *
 * dir_save_name: Here you define whether you want savefiles to be
 *   created in a new folder.
 *   This option does not work with "{Game}\save\" or "{Game}\".
 *
 *   GameTitle: The folder will be named the same as the title in the game bar
 *   GameTitle (without space): An extra option
 *   GameTitle (underline replaces spaces): Another extra option
 *   Developer defined: To set a different name change to "Text"
 *
 *   Warning: Symbols, accented letters and non-English characters
 *            will be removed automatically, except "+", "-" and "_"
 */

(function() {
	if (process.env.OS == "Windows_NT") {
		var path = require('path');
		var base = path.dirname(process.mainModule.filename);
		var new_path = "";
		
		var parameters = PluginManager.parameters('Advanced_ChangeSaveLocation');
		
		switch (parameters['location']) {
			case "Default":
				new_path = path.join(base, 'save/');
				break;
			case "Current Folder":
				new_path = path.join(base, '/');
				break;
			case "ProgramData":
				new_path = process.env.ProgramData || process.env.ALLUSERSPROFILE;
				break;
			case "Appdata-Local":
				new_path = process.env.LOCALAPPDATA || process.env.LOCAL_APPDATA;
				break;
			case "Appdata-Roaming":
				new_path = process.env.APPDATA;
				break;
			case "Public Documents":
				new_path = process.env.PUBLIC+"/Documents";
				break;
			case "Current User":
				new_path = process.env.USERPROFILE;
				break;
			case "Documents of Current User":
				new_path = process.env.USERPROFILE+"/Documents";
				break;
			default:
				parameters['location'] = "Default";
				new_path = path.join(base, 'save/');
		}
		
		if (parameters['location'] != "Default" && parameters['location'] != "Current Folder"){
			var mkdirsaves = true;
			var convtitle = document.title;
			convtitle = convtitle.replace(/[^a-zA-Z0-9\_\-\+\s]/g,"");
			switch (parameters['dir_save_name']) {
				case "GameTitle":
					new_path = new_path+"/"+convtitle+"/";
					break;
				case "TitleNoSpace":
					convtitle = convtitle.replace(/\s/g,"");
					new_path = new_path+"/"+convtitle+"/";
					break;
				case "TitleWithUnderline":
					convtitle = convtitle.replace(/\s/g,"_");
					new_path = new_path+"/"+convtitle+"/";
					break;
				default:
					var dev_defined = parameters['dir_save_name'];
					dev_defined = dev_defined.replace(/[^a-zA-Z0-9\s\_\-]/g,"");
					new_path = new_path+"/"+dev_defined+"/";
			}
			if(new_path.slice(-2) == "//"){
				new_path = path.join(base, 'save/');
			}
			var fs = require('fs');
			if(!fs.existsSync(new_path)){
				fs.mkdirSync(new_path);
			}
		}
		/* RMMV */
		if(StorageManager.localFileDirectoryPath){
			StorageManager.localFileDirectoryPath = function() {
				return new_path;
			};
		}
		
		/* RMMZ */
		if(StorageManager.fileDirectoryPath){
			StorageManager.fileDirectoryPath = function() {
				return new_path;
			}
		}
	}
})();
