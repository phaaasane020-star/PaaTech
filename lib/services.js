export const I = {
  monitor: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>,
  up: <path d="M12 19V5M5 12l7-7 7 7" />,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  doc: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></>,
  refresh: <><path d="M21 12a9 9 0 1 1-3-6.7L21 8" /><path d="M21 3v5h-5" /></>,
  code: <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />,
  game: <><rect x="2" y="7" width="20" height="10" rx="4" /><path d="M7 12h4M9 10v4" /><circle cx="16" cy="11" r="1" /><circle cx="18" cy="13" r="1" /></>,
  cpu: <><rect x="5" y="5" width="14" height="14" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" /></>,
  bug: <><path d="M8 2l1.9 1.9M16 2l-1.9 1.9M9 7.1V6a3 3 0 0 1 6 0v1.1" /><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6z" /><path d="M12 20v-9M6 13H2M22 13h-4M6 17l-3 1M18 17l3 1M6 9L3 8M18 9l3-1" /></>,
  warn: <><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><path d="M12 9v4M12 17h.01" /></>,
  rotate: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></>,
  laptop: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M2 20h20" /></>,
  wrench: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
}

export const services = [
  { icon: 'monitor', title: 'Windows installation', text: 'Clean Windows installation for laptops and desktops, including partition setup, formatting, key drivers and a fresh, fast working environment.', tags: ['Win 10', 'Win 11', 'Clean install', 'Drivers'] },
  { icon: 'up', title: 'Windows upgrade', text: 'Upgrade from Windows 8, 10 or 11 while keeping performance stable. Includes compatibility checks, setup support and post-upgrade tuning.', tags: ['Windows 8', 'Windows 10', 'Windows 11'] },
  { icon: 'shield', title: 'Windows activation', text: 'Windows activation support using proper licensing methods, so your system is properly set up and personalization is unlocked.', tags: ['Activation', 'Licensing'] },
  { icon: 'doc', title: 'Microsoft Office setup & activation', text: 'Installation, setup and activation of Microsoft Office so Word, Excel and PowerPoint are ready to use on your laptop.', tags: ['Word', 'Excel', 'PowerPoint'] },
  { icon: 'refresh', title: 'Laptop formatting', text: 'Full laptop formatting to remove old system clutter, fix slow performance, clear corrupt installations and prepare your device for a clean setup.', tags: ['Formatting', 'Clean system', 'Fresh setup'] },
  { icon: 'cpu', title: 'Driver installation & update', text: 'Installation and updating of missing or outdated drivers, including graphics, Wi-Fi, audio, Bluetooth, chipset, printer and device drivers.', tags: ['Drivers', 'Wi-Fi', 'Audio', 'Graphics'] },
  { icon: 'bug', title: 'Virus / malware removal', text: 'Removal of viruses, malware, suspicious programs, browser hijackers, popups, slow-down threats and unwanted background processes.', tags: ['Virus removal', 'Malware', 'Cleanup', 'Security'] },
  { icon: 'warn', title: 'Boot error fixing', text: 'Fix startup problems, boot loops, blue screen issues, missing boot device errors, corrupted boot records and Windows startup failures.', tags: ['Boot error', 'Startup repair', 'Blue screen'] },
  { icon: 'rotate', title: 'System reset / recovery', text: 'System reset, Windows recovery, file-safe recovery options, corrupted system repair and restoration of your laptop or desktop to a usable state.', tags: ['Reset', 'Recovery', 'Repair', 'Restore'] },
  { icon: 'laptop', title: 'Laptop troubleshooting', text: 'General laptop and computer troubleshooting for slow systems, software errors, crashes, update problems, driver issues and abnormal device behavior.', tags: ['Troubleshooting', 'Diagnostics', 'Support'] },
  { icon: 'wrench', title: 'Technical diagnostics', text: 'Resolving complex application installation errors, repairing system dependency layers, fixing configuration problems and restoring peak performance across Windows.', tags: ['Diagnostics', 'Registry', 'Repair', 'Optimization'] },
  { icon: 'game', title: 'PC games installation', text: 'Game installation and setup on your PC, with the needed drivers and settings checked so games run smoothly.', tags: ['Install', 'Setup', 'Drivers'] },
  { icon: 'code', title: 'Custom web engineering', text: 'Building secure routes, relational data connections and modular web applications with modern layouts. Full-stack platforms that are scalable and performance-tuned.', tags: ['Python', 'Flask', 'HTML/CSS', 'JavaScript', 'Laravel'], featured: true }
]
