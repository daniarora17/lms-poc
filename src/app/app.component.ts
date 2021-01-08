import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { TerminalService } from 'primeng/components/terminal/terminalservice';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, take } from 'rxjs/operators';
import { CommandService } from './services/command.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [TerminalService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private terminalService: TerminalService, private commandSer: CommandService) { }
  destroy$ = new Subject();
  ngOnInit() {
    this.terminalService.commandHandler.pipe(takeUntil(this.destroy$), debounceTime(500)).subscribe(command => {
      if (command) {
        const reqBody = {
          'command': command.split(' ')
        };
        this.commandSer.getCommandData(reqBody).pipe(take(1)).subscribe(res => {
          this.terminalService.sendResponse(res.msg);
        });
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
