import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'Test DApp',
    projectId: '5488fb677ed87050e8f0c73835a34ad2',
    chains: [sepolia],
});