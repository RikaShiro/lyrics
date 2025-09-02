const fs = require('fs')
const path = require('path')

const jpRoot = path.join(__dirname, 'JP')

function walkDir(dir, callback) {
	fs.readdirSync(dir, { withFileTypes: true }).forEach((dirent) => {
		const fullPath = path.join(dir, dirent.name)
		if (dirent.isDirectory()) {
			walkDir(fullPath, callback)
		} else {
			callback(fullPath, dir)
		}
	})
}

walkDir(jpRoot, (filePath, parentDir) => {
	// Skip files directly under JP (not in subfolders)
	if (path.dirname(filePath) === jpRoot) return

	const fileName = path.basename(filePath)
	const dashIdx = fileName.indexOf('-')
	if (dashIdx > 0) {
		const newName = fileName.slice(dashIdx + 1)
		const newPath = path.join(parentDir, newName)
		fs.renameSync(filePath, newPath)
		console.log(`Renamed: ${filePath} -> ${newPath}`)
	}
})
