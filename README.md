# MVMZ-Advanced_ChangeSaveLocation
Works only with Windows

Paths (param -> location):
Here you define the path to the savefiles

{Game}\save\ (Default)
{Game}\
{SO}:\ProgramData\
{SO}:\Users\ {User}\Appdata\Local\
{SO}:\Users\ {User}\Appdata\Roaming\
{SO}:\Users\Public\Documents\
{SO}:\Users\ {User}\
{SO}:\Users\ {User}\Documents\

{Game} is where files are located, like Game.exe
{SO} is the drive where the operating system is installed, like C
{User} is the connected user's folder



Folder name (param -> dir_save_name):
Here you define whether you want savefiles to be
created in a new folder.
This option does not work with "{Game}\save\" or "{Game}\".

GameTitle: The folder will be named the same as the title in the game bar
GameTitle (without space): An extra option
GameTitle (underline replaces spaces): Another extra option
Developer defined: To set a different name change to "Text"

Warning: Symbols, accented letters and non-English characters
	     will be removed automatically, except "+", "-" and "_"

Example, path 4 with directory name 3:
Result C:\Users\{User}\Appdata\Local\Project_1




License: Free to Comercial Non-Comercial
