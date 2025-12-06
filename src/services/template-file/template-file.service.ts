import { LocalTemplateFileService } from "./local-template-file.service";

// Singleton pattern to ensure a single instance of LocalTemplateFileService
// Will abstract to BaseTemplateFileService in the future to support multiple storage backends
export class TemplateFileService {
	private static instance: LocalTemplateFileService | null = null;

	static getInstance() {
		if (!this.instance) {
			this.instance = new LocalTemplateFileService();
		}
		return this.instance;
	}
}
