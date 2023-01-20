import { TestBed } from '@angular/core/testing';

import { PomodoroConfigService } from './pomodoro-config.service';

describe('PomodoroConfigService', () => {
  let service: PomodoroConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PomodoroConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
